import { expect, test } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  const emailField = page.locator('[data-test="email"]');
  const passwordField = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-submit"]');
  const pageTitle = page.locator('[data-test="page-title"]');
  const userName = page.locator('[data-test="nav-menu"]');

  await page.goto('/auth/login');
  await emailField.fill('customer@practicesoftwaretesting.com');
  await passwordField.fill('welcome01');
  await loginButton.click();

  await expect(page).toHaveURL('/account');
  await expect(pageTitle).toHaveText('My account');
  await expect(userName).toHaveText('Jane Doe');
});
