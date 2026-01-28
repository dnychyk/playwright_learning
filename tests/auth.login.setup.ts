import { testUsers } from '../src/data/test-users';
import path from 'path';
import { test as setup } from '../src/fixtures';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Perform login with valid credentials', async ({ app, page }) => {
  await page.goto('/auth/login');
  await app.loginPage.performLogin(testUsers.customer.email, testUsers.customer.password);

  await page.context().storageState({ path: authFile });
});
