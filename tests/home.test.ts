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
  await expect(page.getByTestId('product-name')).toHaveText('Combination Pliers');
  await expect(page.getByTestId('unit-price')).toHaveText('14.15');
  await expect(page.getByTestId('add-to-cart')).toBeVisible();
  await expect(page.getByTestId('add-to-favorites')).toBeVisible();
});

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const product_1 = 'Slip Joint Pliers';
  const alertMessage = page.getByRole('alert', { name: 'Product added to shopping cart.' });

  await page.goto('/');
  await homePage.openProduct(product_1);

  await expect(page).toHaveURL(/product\/.+/);
  await expect(page.getByTestId('product-name')).toHaveText(product_1);
  await expect(page.getByTestId('unit-price')).toHaveText('9.17');

  await homePage.addToCart();
  await expect(alertMessage).toBeVisible();
  await expect(alertMessage).toHaveText('Product added to shopping cart.');
  await expect(alertMessage).toBeHidden({ timeout: 8000 });
  await expect(page.getByTestId('nav-cart')).toHaveText('1');

  await homePage.openCart();
  await expect(page.getByTestId('product-title')).toHaveCount(1);
  await expect(page.getByTestId('product-title')).toHaveText(product_1);
  await expect(page.getByTestId('proceed-1')).toBeVisible();
});

[
  { sort: 'Name (A - Z)', direction: 'ASC', compare: (a: string, b: string) => a.localeCompare(b) },
  { sort: 'Name (Z - A)', direction: 'DESC', compare: (a: string, b: string) => b.localeCompare(a) },
].forEach(({ sort, direction, compare }) => {
  test(`Verify user can perform sorting by name in ${direction} order`, async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');

    await homePage.sortProduct(sort);
    const products = await page.getByTestId('product-name').allTextContents();

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
    const products = await page.getByTestId('product-price').allTextContents();

    expect(products).toEqual([...products].sort(compare));
  });
});

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/');

  await homePage.filterByCategory(PowerTools.Sander);
  await expect
    .poll(
      async () => {
        const products = await page.getByTestId('product-name').allTextContents();
        return products.every((product) => product.includes('Sander'));
      },
      { timeout: 10000 }
    )
    .toBe(true);
});
