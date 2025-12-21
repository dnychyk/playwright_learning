import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './header';

export class LoginPage {
  page: Page;
  header: HeaderFragment;
  emailField: Locator;
  passwordField: Locator;
  title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.emailField = this.page.getByTestId('email');
    this.passwordField = this.page.getByTestId('password');
    this.title = this.page.getByTestId('page-title');
  }

  async performLogin(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.page.getByTestId('login-submit').click();
  }
}
