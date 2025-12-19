import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]')).toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText('Jane Doe');
});
