import { test as setup } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Perform login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await page.context().storageState({ path: authFile });
});
