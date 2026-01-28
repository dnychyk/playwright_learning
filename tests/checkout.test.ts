import { expect, test } from '../src/fixtures';
import { getExpirationDate } from '../src/utils/date.helper';

test('Verify user can buy the product', async ({ loggedInApp }) => {
  const expirationDate = getExpirationDate(3);

  await loggedInApp.page.goto('/');
  await loggedInApp.homePage.openFirstProduct();
  const productName = await loggedInApp.checkoutPage.productName.innerText();
  const productPrice = await loggedInApp.checkoutPage.unitPrice.innerText();

  await loggedInApp.homePage.addToCart();
  await loggedInApp.homePage.openCart();
  await expect(loggedInApp.checkoutPage.cartProductTitle).toHaveCount(1);
  await expect(loggedInApp.checkoutPage.cartProductTitle).toHaveText(productName);
  await expect(loggedInApp.checkoutPage.totalPrice).toContainText(productPrice);
  await expect(loggedInApp.checkoutPage.productPrice).toContainText(productPrice);

  await loggedInApp.checkoutPage.proceedToCheckout();
  await expect(loggedInApp.header.userMenu).toBeVisible();
  await expect(loggedInApp.checkoutPage.proceedToCheckoutBtn).toBeVisible();
  await loggedInApp.checkoutPage.proceedToCheckout();

  await loggedInApp.checkoutPage.fillState('Test State');
  await loggedInApp.checkoutPage.fillPostcode('11111');
  await loggedInApp.checkoutPage.proceedToCheckout();

  await loggedInApp.checkoutPage.choosePaymentMethod('Credit Card');
  await loggedInApp.checkoutPage.fillCardNumber('1111-1111-1111-1111');
  await loggedInApp.checkoutPage.fillExpirationDate(expirationDate);
  await loggedInApp.checkoutPage.fillCvv('111');
  await loggedInApp.checkoutPage.fillHolderName('Jane Doe');
  await loggedInApp.checkoutPage.clickConfirm();
  await expect(loggedInApp.checkoutPage.paymentSuccessMsg).toBeVisible();
});
