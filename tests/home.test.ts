import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/homepage.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const product_1 = 'Combination Pliers';

  await page.goto('/');
  await homePage.openProduct(product_1);

  await expect(page).toHaveURL(/product\/.+/);
  await expect(page.getByTestId('product-name')).toHaveText('Combination Pliers');
  await expect(page.getByTestId('unit-price')).toHaveText('14.15');
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});
