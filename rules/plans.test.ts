import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import * as fs from "firebase/firestore";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { assemblePlan } from "@/core/assemble";
import { templateBlueprint } from "@/core/templates";
import { planQueries, toRecord } from "@/store/cloud";
import { TODAY, weddingBrief } from "@/test/fixtures";

let env: RulesTestEnvironment;

const plan = assemblePlan(weddingBrief, templateBlueprint(weddingBrief), {
  id: "p1",
  today: TODAY,
  now: new Date("2026-10-20T10:00:00Z"),
});
const record = toRecord(
  "owner",
  plan,
  ["aunt@example.com"],
  ["cousin@example.com"],
);
const data = record.data;

const as = (uid: string, email?: string) =>
  env
    .authenticatedContext(uid, email ? { email, email_verified: true } : {})
    .firestore();

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-samaroh",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

afterAll(async () => {
  await env?.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), "plans/p1"), record);
  });
});

describe("plans/{planId}", () => {
  it("lets the owner read, update and delete", async () => {
    const db = as("owner");
    await assertSucceeds(getDoc(doc(db, "plans/p1")));
    await assertSucceeds(
      updateDoc(doc(db, "plans/p1"), {
        data: { ...data, brief: { ...data.brief, title: "Renamed" } },
        updatedAt: "2026-10-21T00:00:00.000Z",
      }),
    );
    await assertSucceeds(deleteDoc(doc(db, "plans/p1")));
  });

  it("lets an editor update the plan body, but not editors, viewers or the doc itself", async () => {
    const db = as("editor-user", "aunt@example.com");
    await assertSucceeds(getDoc(doc(db, "plans/p1")));
    await assertSucceeds(
      updateDoc(doc(db, "plans/p1"), {
        data: { ...data, brief: { ...data.brief, title: "Aunt's tweak" } },
        updatedAt: "2026-10-21T00:00:00.000Z",
      }),
    );
    await assertFails(
      updateDoc(doc(db, "plans/p1"), {
        editors: ["intruder@example.com"],
      }),
    );
    await assertFails(deleteDoc(doc(db, "plans/p1")));
  });

  it("lets a viewer read, but write nothing", async () => {
    const db = as("viewer-user", "cousin@example.com");
    await assertSucceeds(getDoc(doc(db, "plans/p1")));
    await assertFails(
      updateDoc(doc(db, "plans/p1"), {
        data: { ...data, brief: { ...data.brief, title: "Cousin tweak" } },
      }),
    );
    await assertFails(deleteDoc(doc(db, "plans/p1")));
  });

  it("denies anyone who is not owner, editor or viewer (including signed-out)", async () => {
    await assertFails(
      getDoc(doc(as("stranger", "stranger@example.com"), "plans/p1")),
    );
    await assertFails(
      getDoc(doc(env.unauthenticatedContext().firestore(), "plans/p1")),
    );
  });

  it("rejects malformed documents", async () => {
    const db = as("owner");
    await assertFails(updateDoc(doc(db, "plans/p1"), { extra: true }));
    await assertFails(
      updateDoc(doc(db, "plans/p1"), {
        data: { ...data, brief: { ...data.brief, guests: 0 } },
      }),
    );
    await assertFails(
      updateDoc(doc(db, "plans/p1"), { data: { ...data, id: "other" } }),
    );
  });

  it("allows the exact queries sync runs, for owner, editor and viewer (mixed-case email)", async () => {
    const run = async (uid: string, email: string | null) => {
      const db = env
        .authenticatedContext(uid, email ? { email, email_verified: true } : {})
        .firestore();
      const snaps = await Promise.all(
        planQueries(fs, db as unknown as fs.Firestore, uid, email).map((q) =>
          getDocs(q),
        ),
      );
      return snaps.reduce((n, s) => n + s.size, 0);
    };
    expect(await run("owner", null)).toBe(1);
    expect(await run("aunt", "Aunt@Example.com")).toBe(1);
    expect(await run("cousin", "cousin@example.com")).toBe(1);
    expect(await run("stranger", "stranger@example.com")).toBe(0);
  });

  it("keeps every other collection closed", async () => {
    await assertFails(setDoc(doc(as("owner"), "users/owner"), { a: 1 }));
  });
});
