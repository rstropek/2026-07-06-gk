import { expect, test } from "@playwright/test";

test("sends a message and receives a non-empty agent response", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Message").fill("Sag bitte kurz hallo.");
  await page.getByRole("button", { name: "Send" }).click();

  await expect(page.getByText("Sag bitte kurz hallo.")).toBeVisible();

  const agentMessage = page.locator(".message--agent .message__content").first();
  await expect(agentMessage).toBeVisible({ timeout: 60_000 });
  await expect
    .poll(
      async () => {
        const text = await agentMessage.textContent();
        return text?.trim() ?? "";
      },
      { timeout: 60_000 },
    )
    .not.toBe("");
  await expect
    .poll(
      async () => {
        const text = await agentMessage.textContent();
        return text?.trim() ?? "";
      },
      { timeout: 60_000 },
    )
    .not.toBe("...");
});
