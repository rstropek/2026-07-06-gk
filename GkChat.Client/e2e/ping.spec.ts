import { expect, test } from "@playwright/test";

test("calls the ping API and shows pong", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Ping API" }).click();

  await expect(page.locator("output")).toHaveText("pong");
  await expect(page.getByText("Connected")).toBeVisible();
});
