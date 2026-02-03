/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from '../src/fixtures';

test('Verify user can view product details', { tag: '@regression' }, async ({ app, page }) => {
  await page.route('https://api.practicesoftwaretesting.com/products*', async (route) => {
    const response = await route.fetch();
    const json = await response.json();

    await route.fulfill({
      json: {
        ...json,
        data: [...json.data, ...json.data, ...json.data].slice(0, 20),
      },
    });
  });

  await page.goto('/');
  await expect(app.homePage.productName).toHaveCount(20);
});
