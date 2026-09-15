import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "tests/e2e", workers: 1, retries: 0, use: { baseURL: process.env.INSPECTION_DESK_BASE_URL || "http://127.0.0.1:4310", browserName: "chromium" }, reporter: "list" });
