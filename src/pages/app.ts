import { Page } from '@playwright/test';
import { AccountPage } from './account.page';
import { LoginPage } from './login.page';
import { HeaderFragment } from './header';
import { HomePage } from './homepage.page';
import { CheckoutPage } from './checkout.page';

export class App {
  page: Page;
  loginPage: LoginPage;
  accPage: AccountPage;
  homePage: HomePage;
  checkoutPage: CheckoutPage;
  header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.accPage = new AccountPage(page);
    this.homePage = new HomePage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.header = new HeaderFragment(page);
  }
}
