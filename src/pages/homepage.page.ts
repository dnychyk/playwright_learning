import { Page } from '@playwright/test';
import { HeaderFragment } from './header';

export class HomePage {
  page: Page;
  header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
  }

  async openProduct(product: string) {
    await this.page.getByTestId('product-name').filter({ hasText: product }).click();
  }

  async addToCart() {
    await this.page.getByTestId('add-to-cart').click();
  }

  async openCart() {
    await this.page.getByTestId('nav-cart').click();
  }

  async sortProduct(sort: string) {
    await this.page.getByRole('combobox', { name: 'sort' }).selectOption(sort);
  }

  async filterByCategory(category: string) {
    await this.page.getByRole('checkbox', { name: category }).check();
  }
}
