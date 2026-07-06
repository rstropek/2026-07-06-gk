import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4200",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command:
        "dotnet run --project ../GkChat.Api/GkChat.Api.csproj --no-launch-profile -- --urls http://127.0.0.1:5179",
      url: "http://127.0.0.1:5179/ping",
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      command: "npm start -- --host 127.0.0.1 --port 4200 --watch=false",
      url: "http://127.0.0.1:4200",
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
    },
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
