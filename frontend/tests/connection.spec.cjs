const { test, expect } = require('@playwright/test');

test('shows the database connection state', async ({ page }) => {
  await page.goto('/health-check');
  await expect(page.getByRole('status')).toHaveText(
    'API and database connected',
  );
});

test('shows failure when the API cannot reach the database', async ({
  page,
}) => {
  await page.route('**/api/health', (route) =>
    route.fulfill({
      status: 503,
      json: { status: 'error', database: 'unavailable' },
    }),
  );
  await page.goto('/health-check');
  await expect(page.getByRole('status')).toHaveText('Connection unavailable');
});
