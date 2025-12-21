import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('/account');
  await expect(loginPage.title).toHaveText('My account');
  await expect(loginPage.header.userMenu).toHaveText('Jane Doe');
});
