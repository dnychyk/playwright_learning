import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header';

export class LoginPage {
  page: Page;
  header: HeaderFragment;
  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.title = this.page.locator('[data-test="page-title"]');
  }
}
