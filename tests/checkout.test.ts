import { expect, test } from '../src/fixtures';
import { getExpirationDate } from '../src/utils/date.helper';

test('Verify user can buy the product', { tag: ['@smoke', '@regression'] }, async ({ loggedInApp }) => {
  const expirationDate = getExpirationDate(3);

  await test.step('Navigate to home page and select product', async () => {
    await loggedInApp.page.goto('/');
    await loggedInApp.homePage.openFirstProduct();
    const productName = await loggedInApp.checkoutPage.productName.innerText();
    const productPrice = await loggedInApp.checkoutPage.unitPrice.innerText();

    await test.step('Add product to cart and verify cart contents', async () => {
      await loggedInApp.homePage.addToCart();
      await loggedInApp.homePage.openCart();
      await expect(loggedInApp.checkoutPage.cartProductTitle).toHaveCount(1);
      await expect(loggedInApp.checkoutPage.cartProductTitle).toHaveText(productName);
      await expect(loggedInApp.checkoutPage.totalPrice).toContainText(productPrice);
      await expect(loggedInApp.checkoutPage.productPrice).toContainText(productPrice);
    });

    await test.step('Proceed to checkout - Sign in step', async () => {
      await loggedInApp.checkoutPage.proceedToCheckout();
      await expect(loggedInApp.header.userMenu).toBeVisible();
      await expect(loggedInApp.checkoutPage.proceedToCheckoutBtn).toBeVisible();
      await loggedInApp.checkoutPage.proceedToCheckout();
    });

    await test.step('Fill billing address', async () => {
      await loggedInApp.checkoutPage.fillState('Test State');
      await loggedInApp.checkoutPage.fillPostcode('11111');
      await loggedInApp.checkoutPage.proceedToCheckout();
    });

    await test.step('Fill payment details and complete purchase', async () => {
      await loggedInApp.checkoutPage.choosePaymentMethod('Credit Card');
      await loggedInApp.checkoutPage.fillCardNumber('1111-1111-1111-1111');
      await loggedInApp.checkoutPage.fillExpirationDate(expirationDate);
      await loggedInApp.checkoutPage.fillCvv('111');
      await loggedInApp.checkoutPage.fillHolderName('Jane Doe');
      await loggedInApp.checkoutPage.clickConfirm();
    });

    await test.step('Verify payment success', async () => {
      await expect(loggedInApp.checkoutPage.paymentSuccessMsg).toBeVisible();
    });
  });
});
