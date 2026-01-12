import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header';

export class HomePage {
  page: Page;
  header: HeaderFragment;

  productName: Locator;
  productPrice: Locator;

  unitPrice: Locator;
  addToCartBtn: Locator;
  addToFavoritesBtn: Locator;

  cartCount: Locator;
  cartProductTitle: Locator;
  proceedToCheckoutBtn: Locator;

  alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);

    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('product-price');

    this.unitPrice = page.getByTestId('unit-price');
    this.addToCartBtn = page.getByTestId('add-to-cart');
    this.addToFavoritesBtn = page.getByTestId('add-to-favorites');

    this.cartCount = page.getByTestId('nav-cart');
    this.cartProductTitle = page.getByTestId('product-title');
    this.proceedToCheckoutBtn = page.getByTestId('proceed-1');

    this.alertMessage = page.getByRole('alert');
  }

  async openProduct(product: string) {
    await this.productName.filter({ hasText: product }).click();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async openCart() {
    await this.cartCount.click();
  }

  async sortProduct(sort: string) {
    await this.page.getByRole('combobox', { name: 'sort' }).selectOption(sort);
  }

  async filterByCategory(category: string) {
    await this.page.getByRole('checkbox', { name: category }).check();
  }
}
