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
}
