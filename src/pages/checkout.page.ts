import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  page: Page;

  productName: Locator;
  productPrice: Locator;

  cartProductTitle: Locator;
  unitPrice: Locator;
  totalPrice: Locator;
  proceedToCheckoutBtn: Locator;

  stateField: Locator;
  postalCode: Locator;

  cardNumber: Locator;
  expirationDate: Locator;
  cvv: Locator;
  holderName: Locator;
  confirmBtn: Locator;
  paymentSuccessMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('product-price');

    this.cartProductTitle = page.getByTestId('product-title');
    this.unitPrice = page.getByTestId('unit-price');
    this.totalPrice = page.getByTestId('cart-total');
    this.proceedToCheckoutBtn = page.getByRole('button', { name: 'Proceed to checkout' });

    this.stateField = page.getByTestId('state');
    this.postalCode = page.getByTestId('postal_code');

    this.cardNumber = page.getByTestId('credit_card_number');
    this.expirationDate = page.getByTestId('expiration_date');
    this.cvv = page.getByTestId('cvv');
    this.holderName = page.getByTestId('card_holder_name');
    this.confirmBtn = page.getByTestId('finish');
    this.paymentSuccessMsg = page.getByTestId('payment-success-message');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }

  async fillState(state: string) {
    await this.stateField.fill(state);
  }

  async fillPostcode(code: string) {
    await this.postalCode.fill(code);
  }

  async choosePaymentMethod(method: string) {
    await this.page.getByRole('combobox', { name: 'Payment Method' }).selectOption(method);
  }

  async fillCardNumber(number: string) {
    await this.cardNumber.fill(number);
  }

  async fillExpirationDate(date: string) {
    await this.expirationDate.fill(date);
  }

  async fillCvv(cvv: string) {
    await this.cvv.fill(cvv);
  }

  async fillHolderName(name: string) {
    await this.holderName.fill(name);
  }

  async clickConfirm() {
    await this.confirmBtn.click();
  }
}
