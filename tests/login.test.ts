import { expect, test } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { testUsers } from '../src/data/test-users';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin(testUsers.customer.email, testUsers.customer.password);

  await expect(page).toHaveURL('/account');
  await expect(loginPage.title).toHaveText('My account');
  await expect(loginPage.header.userMenu).toHaveText(testUsers.customer.fullName);
});
