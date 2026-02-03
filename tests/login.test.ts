import { expect, test } from '../src/fixtures';
import { testUsers } from '../src/data/test-users';

test('Verify login with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ app, page }) => {
  await test.step('Navigate to login page', async () => {
    await page.goto('/auth/login');
  });

  await test.step('Perform login with valid credentials', async () => {
    await app.loginPage.performLogin(testUsers.customer.email, testUsers.customer.password);
  });

  await test.step('Verify successful login', async () => {
    await expect(page).toHaveURL('/account');
    await expect(app.loginPage.title).toHaveText('My account');
    await expect(app.loginPage.header.userMenu).toHaveText(testUsers.customer.fullName);
  });
});
