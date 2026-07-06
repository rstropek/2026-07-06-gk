import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4300",
    trace: "on-first-retry",
  },
  webServer: [
    {
      command:
        "ASPNETCORE_ENVIRONMENT=Development dotnet run --project ../GkChat.Api/GkChat.Api.csproj --no-launch-profile -- --urls http://127.0.0.1:5180",
      url: "http://127.0.0.1:5180/health",
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
    },
    {
      command: "npm start -- --configuration e2e --host 127.0.0.1 --port 4300 --watch=false",
      url: "http://127.0.0.1:4300",
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
