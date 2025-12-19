import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/homepage.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('/');
  await homePage.openProduct('Combination Pliers');

  await expect(page).toHaveURL(/product\/.+/);
  await expect(page.locator('[data-test="product-name"]')).toHaveText('Combination Pliers');
  await expect(page.locator('[data-test="unit-price"]')).toHaveText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});
