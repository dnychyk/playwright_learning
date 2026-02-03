import { PowerTools } from '../src/enums/category-filter.enum';
import { expect, test } from '../src/fixtures';

test('Verify user can view product details', { tag: ['@smoke', '@regression'] }, async ({ app, page }) => {
  const product = 'Combination Pliers';

  await test.step('Navigate to home page and open product', async () => {
    await page.goto('/');
    await app.homePage.openProduct(product);
  });

  await test.step('Verify product details are displayed correctly', async () => {
    await expect(page).toHaveURL(/product\/.+/);
    await expect(app.homePage.productName).toHaveText('Combination Pliers');
    await expect(app.homePage.unitPrice).toHaveText('14.15');
    await expect(app.homePage.addToCartBtn).toBeVisible();
    await expect(app.homePage.addToFavoritesBtn).toBeVisible();
  });
});

test('Verify user can add product to cart', { tag: '@regression' }, async ({ app, page }) => {
  const product = 'Slip Joint Pliers';

  await test.step('Navigate to home page and open product', async () => {
    await page.goto('/');
    await app.homePage.openProduct(product);
  });

  await test.step('Verify product details', async () => {
    await expect(page).toHaveURL(/product\/.+/);
    await expect(app.homePage.productName).toHaveText(product);
    await expect(app.homePage.unitPrice).toHaveText('9.17');
  });

  await test.step('Add product to cart and verify alert', async () => {
    await app.homePage.addToCart();
    await expect(app.homePage.alertMessage).toBeVisible();
    await expect(app.homePage.alertMessage).toHaveText('Product added to shopping cart.');
    await expect(app.homePage.alertMessage).toBeHidden({ timeout: 8000 });
    await expect(app.homePage.cartCount).toHaveText('1');
  });

  await test.step('Open cart and verify product is added', async () => {
    await app.homePage.openCart();
    await expect(app.checkoutPage.cartProductTitle).toHaveCount(1);
    await expect(app.checkoutPage.cartProductTitle).toHaveText(product);
    await expect(app.checkoutPage.proceedToCheckoutBtn).toBeVisible();
  });
});

[
  { sort: 'Name (A - Z)', direction: 'ASC', compare: (a: string, b: string) => a.localeCompare(b) },
  { sort: 'Name (Z - A)', direction: 'DESC', compare: (a: string, b: string) => b.localeCompare(a) },
].forEach(({ sort, direction, compare }) => {
  test(
    `Verify user can perform sorting by name in ${direction} order`,
    { tag: '@regression' },
    async ({ app, page }) => {
      await test.step('Navigate to home page', async () => {
        await page.goto('/');
      });

      await test.step(`Sort products by ${sort}`, async () => {
        await app.homePage.sortProduct(sort);
      });

      await test.step('Verify products are sorted correctly', async () => {
        const products = await app.homePage.productName.allTextContents();
        expect(products).toEqual([...products].sort(compare));
      });
    },
  );
});

[
  { sort: 'Price (High - Low)', direction: 'ASC', compare: (a: string, b: string) => a.localeCompare(b) },
  { sort: 'Price (Low - High)', direction: 'DESC', compare: (a: string, b: string) => b.localeCompare(a) },
].forEach(({ sort, direction, compare }) => {
  test(
    `Verify user can perform sorting by price in ${direction} order`,
    { tag: '@regression' },
    async ({ app, page }) => {
      await test.step('Navigate to home page', async () => {
        await page.goto('/');
      });

      await test.step(`Sort products by ${sort}`, async () => {
        await app.homePage.sortProduct(sort);
      });

      await test.step('Verify products are sorted correctly', async () => {
        const products = await app.homePage.productPrice.allTextContents();
        expect(products).toEqual([...products].sort(compare));
      });
    },
  );
});

test('Verify user can filter products by category', { tag: '@regression' }, async ({ app, page }) => {
  await test.step('Navigate to home page', async () => {
    await page.goto('/');
  });

  await test.step('Filter products by Sander category', async () => {
    await app.homePage.filterByCategory(PowerTools.Sander);
    await page.waitForResponse(/\/products.*by_category/);
  });

  await test.step('Verify filtered products contain Sander', async () => {
    const products = await app.homePage.productName.allTextContents();
    expect(products.every((product) => product.includes('Sander'))).toBe(true);
  });
});
