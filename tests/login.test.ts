import { expect, test } from '../src/fixtures';
import { testUsers } from '../src/data/test-users';

test('Verify login with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ app, page }) => {
  await page.goto('/auth/login');
  await app.loginPage.performLogin(testUsers.customer.email, testUsers.customer.password);

  await expect(page).toHaveURL('/account');
  await expect(app.loginPage.title).toHaveText('My account');
  await expect(app.loginPage.header.userMenu).toHaveText(testUsers.customer.fullName);
});
