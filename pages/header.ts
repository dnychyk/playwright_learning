import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  page: Page;
  home: Locator;
  logo: Locator;
  userMenu: Locator;
  signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.home = this.page.locator('[data-test="nav-home"]');
    this.logo = this.page.getByRole('link', { name: 'Practice Software Testing -' });
    this.userMenu = this.page.locator('[data-test="nav-menu"]');
    this.signIn = this.page.locator('[data-test="nav-sign-in"]');
  }
}
