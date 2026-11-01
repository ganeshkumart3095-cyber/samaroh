import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samaroh · AI celebration planner",
    short_name: "Samaroh",
    description:
      "Samaroh — Intelligent Indian celebration, wedding and event planning architecture.",
    start_url: "/",
    display: "standalone",
    background_color: "#060919",
    theme_color: "#f59e0b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
