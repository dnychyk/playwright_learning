import { expect, test } from '@playwright/test';
import { HomePage } from '../src/pages/homepage.page';
import { PowerTools } from '../src/enums/category-filter.enum';

test.use({ storageState: 'playwright/.auth/user.json' });

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const product_1 = 'Combination Pliers';

  await page.goto('/');
  await homePage.openProduct(product_1);

  await expect(page).toHaveURL(/product\/.+/);
  await expect(homePage.productName).toHaveText('Combination Pliers');
  await expect(homePage.unitPrice).toHaveText('14.15');
  await expect(homePage.addToCartBtn).toBeVisible();
  await expect(homePage.addToFavoritesBtn).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const product_1 = 'Slip Joint Pliers';

  await page.goto('/');
  await homePage.openProduct(product_1);

  await expect(page).toHaveURL(/product\/.+/);
  await expect(homePage.productName).toHaveText(product_1);
  await expect(homePage.unitPrice).toHaveText('9.17');

  await homePage.addToCart();
  await expect(homePage.alertMessage).toBeVisible();
  await expect(homePage.alertMessage).toHaveText('Product added to shopping cart.');
  await expect(homePage.alertMessage).toBeHidden({ timeout: 8000 });
  await expect(homePage.cartCount).toHaveText('1');

  await homePage.openCart();
  await expect(homePage.cartProductTitle).toHaveCount(1);
  await expect(homePage.cartProductTitle).toHaveText(product_1);
  await expect(homePage.proceedToCheckoutBtn).toBeVisible();
});

[
  { sort: 'Name (A - Z)', direction: 'ASC', compare: (a: string, b: string) => a.localeCompare(b) },
  { sort: 'Name (Z - A)', direction: 'DESC', compare: (a: string, b: string) => b.localeCompare(a) },
].forEach(({ sort, direction, compare }) => {
  test(`Verify user can perform sorting by name in ${direction} order`, async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');

    await homePage.sortProduct(sort);
    const products = await homePage.productName.allTextContents();

    expect(products).toEqual([...products].sort(compare));
  });
});

[
  { sort: 'Price (High - Low)', direction: 'ASC', compare: (a: string, b: string) => a.localeCompare(b) },
  { sort: 'Price (Low - High)', direction: 'DESC', compare: (a: string, b: string) => b.localeCompare(a) },
].forEach(({ sort, direction, compare }) => {
  test(`Verify user can perform sorting by price in ${direction} order`, async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');

    await homePage.sortProduct(sort);
    const products = await homePage.productPrice.allTextContents();

    expect(products).toEqual([...products].sort(compare));
  });
});

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/');

  await homePage.filterByCategory(PowerTools.Sander);
  await page.waitForResponse(/\/products.*by_category/);

  const products = await homePage.productName.allTextContents();
  expect(products.every((product) => product.includes('Sander'))).toBe(true);
});
