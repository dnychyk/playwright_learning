/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { test as base } from '@playwright/test';
import { App } from './pages/app';
import { testUsers } from './data/test-users';

type MyFixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async ({ request, page }, use) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        email: testUsers.customer.email,
        password: testUsers.customer.password,
      },
    });

    const jsonData = await response.json();
    const token = jsonData.access_token;

    await page.goto('/');
    await page.evaluate((token) => {
      localStorage.setItem('auth-token', token);
    }, token);
    await page.reload();

    const app = new App(page);
    await use(app);
  },
});

export { expect } from '@playwright/test';
