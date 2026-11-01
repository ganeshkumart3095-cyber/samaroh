import { chromium } from "@playwright/test";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const recordingsDir = path.resolve("./recordings");
if (!fs.existsSync(recordingsDir)) {
  fs.mkdirSync(recordingsDir, { recursive: true });
}

console.log("==================================================");
console.log("  Launching Full Samaroh Playwright Video Recording");
console.log("==================================================");

const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--no-sandbox",
  ],
});

const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: {
    dir: recordingsDir,
    size: { width: 1280, height: 720 },
  },
});

const page = await context.newPage();

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

try {
  // ----------------------------------------------------
  // 1. Landing Page Showcase
  // ----------------------------------------------------
  console.log("1. Visiting landing page at http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await delay(2500);

  // Smooth scroll down to highlight landing page features and demo strands
  console.log("   Showcasing landing page features & Diya motifs...");
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 450, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1500);

  // ----------------------------------------------------
  // 2. Wizard: Step 1 (Event Type)
  // ----------------------------------------------------
  console.log("2. Navigating to New Plan Wizard...");
  const newPlanLink = page.getByRole("link", { name: /new plan/i }).first();
  await newPlanLink.click();
  await page.waitForURL("**/plan/new");
  await delay(1500);

  console.log("   Selecting Wedding celebration...");
  await page.locator('input[type="radio"][value="wedding"]').check();
  await delay(1000);

  const nextBtn = page.getByRole("button", { name: /next/i });
  await nextBtn.click();
  await delay(1200);

  // ----------------------------------------------------
  // 3. Wizard: Step 2 (Functions Checklist)
  // ----------------------------------------------------
  console.log("3. Reviewing pre-selected Indian wedding functions...");
  await delay(2000);
  await nextBtn.click();
  await delay(1200);

  // ----------------------------------------------------
  // 4. Wizard: Step 3 (Details: City, Date, Guests, Budget)
  // ----------------------------------------------------
  console.log("4. Entering celebration details...");
  await page.locator("#f-title").fill("Royal Jaipur Wedding Celebration");
  await delay(500);
  await page.locator("#f-city").fill("Jaipur");
  await delay(500);

  // Set date 4 months from now
  const future = new Date();
  future.setMonth(future.getMonth() + 4);
  const dateStr = future.toISOString().slice(0, 10);
  await page.locator("#f-date").fill(dateStr);
  await delay(500);

  await page.locator("#f-guests").fill("350");
  await delay(500);
  await page.locator("#f-budget").fill("1500000"); // 15 Lakh
  await delay(800);

  console.log("   Submitting and compiling blueprint...");
  const submitBtn = page.getByRole("button", { name: /create my plan/i });
  await submitBtn.click();

  // Wait for plan dashboard to load
  await page.waitForURL(/\/plan\/[a-f0-9-]+/);
  await page.waitForLoadState("networkidle");
  await delay(2500);

  // ----------------------------------------------------
  // 5. Dashboard: Overview Tab
  // ----------------------------------------------------
  console.log("5. Dashboard Overview Showcase...");
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1200);

  // ----------------------------------------------------
  // 6. Dashboard: Budget Tab
  // ----------------------------------------------------
  console.log("6. Exploring Budget Tab (Exact Rupee Math)...");
  await page.getByRole("tab", { name: "Budget" }).click();
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1000);

  // ----------------------------------------------------
  // 7. Dashboard: Timeline Tab
  // ----------------------------------------------------
  console.log("7. Exploring Timeline Tab (Function Milestones & Run Sheet)...");
  await page.getByRole("tab", { name: "Timeline" }).click();
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1000);

  // ----------------------------------------------------
  // 8. Dashboard: Vendors Tab
  // ----------------------------------------------------
  console.log("8. Exploring Vendors Tab...");
  await page.getByRole("tab", { name: "Vendors" }).click();
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
  await delay(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1000);

  // ----------------------------------------------------
  // 9. Dashboard: Guests Tab
  // ----------------------------------------------------
  console.log("9. Exploring Guests Tab (RSVP & Dietary Tracking)...");
  await page.getByRole("tab", { name: "Guests" }).click();
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: "smooth" }));
  await delay(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1000);

  // ----------------------------------------------------
  // 10. Dashboard: Ideas Tab (Cultural & Rituals Grounding)
  // ----------------------------------------------------
  console.log("10. Exploring Ideas Tab...");
  await page.getByRole("tab", { name: "Ideas" }).click();
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
  await delay(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1000);

  // ----------------------------------------------------
  // 11. Interactive Planning Assistant
  // ----------------------------------------------------
  console.log("11. Opening Interactive Planning Assistant Drawer...");
  const assistantBtn = page.getByRole("button", {
    name: /ask assistant|assistant/i,
  });
  if (await assistantBtn.isVisible()) {
    await assistantBtn.click();
    await delay(1500);

    const suggestBtn = page
      .getByRole("button", { name: /find savings|budget|ideas/i })
      .first();
    if (await suggestBtn.isVisible()) {
      console.log("    Triggering intelligent query...");
      await suggestBtn.click();
      await delay(3000);
    }

    const closeBtn = page.getByRole("button", { name: /close assistant/i });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await delay(1000);
    }
  }

  // ----------------------------------------------------
  // 12. Multilingual Localization Switching
  // ----------------------------------------------------
  console.log(
    "12. Demonstrating Multilingual Localization (Hindi, Tamil, Telugu)...",
  );
  const langSelect = page.getByRole("combobox", { name: /language/i });
  if (await langSelect.isVisible()) {
    // Switch to Hindi
    console.log("    -> Switching to Hindi (हिन्दी)...");
    await langSelect.selectOption("hi");
    await delay(2500);

    // Switch to Tamil
    console.log("    -> Switching to Tamil (தமிழ்)...");
    await langSelect.selectOption("ta");
    await delay(2500);

    // Switch to Telugu
    console.log("    -> Switching to Telugu (తెలుగు)...");
    await langSelect.selectOption("te");
    await delay(2500);

    // Switch back to English
    console.log("    -> Switching back to English...");
    await langSelect.selectOption("en");
    await delay(2000);
  }

  console.log("Demo walkthrough completed successfully!");
} catch (err) {
  console.error("Recording error:", err);
} finally {
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    console.log("Raw video recorded at:", videoPath);
    const finalMp4 = path.join(recordingsDir, "samaroh-demo.mp4");
    try {
      console.log("Transcoding to MP4 with FFmpeg...");
      execSync(
        `ffmpeg -y -i "${videoPath}" -c:v libx264 -preset fast -crf 22 -c:a aac "${finalMp4}"`,
        {
          stdio: "inherit",
        },
      );
      console.log("SUCCESS! MP4 video ready at:", finalMp4);
    } catch (e) {
      console.warn("FFmpeg transcoding note:", e.message);
    }
  }
}
