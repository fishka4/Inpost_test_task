import { Page } from '@playwright/test';
import BasePage from './base-page';
import OrdersTable from '../elements/orders-table';
import Button from '../elements/button';
import PlaceOrder from '../elements/place-order';
import OrderConfirmation from '../elements/order-confirmation';

export default class CartPage extends BasePage {
  private readonly totalSelector = 'h3[id="totalp"]';
  private placeOrderButton: Button;
  public ordersTable: OrdersTable;
  public placeOrderForm: PlaceOrder;
  public orderConfirmation: OrderConfirmation;

  constructor(page: Page) {
    super(page);
    this.ordersTable = new OrdersTable(page);
    this.placeOrderButton = new Button(page, '//button[contains(@class,"btn-success")]');
    this.placeOrderForm = new PlaceOrder(page);
    this.orderConfirmation = new OrderConfirmation(page);
  }

  public async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  public async getTotalOrderPrice(): Promise<string> {
    const total = await this.page.locator(this.totalSelector).textContent();

    if (total) {
      return total;
    }

    throw new Error('Total is missing.');
  }
}
