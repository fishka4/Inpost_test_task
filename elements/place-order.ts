import { Page } from '@playwright/test';
import { OrderInfo } from '../types/order-info.type';
import BaseElement from './base-element';
import Button from './button';

export default class PlaceOrder extends BaseElement {
  private totalSelector = '[id="totalm"]';
  private generateSelector = (name: string) => `[id='${name}']`;
  public purchase: Button;

  constructor(page: Page) {
    super(page, '//div[@class="modal fade show"]');
    this.purchase = new Button(page, '//button[text()="Purchase"]');
  }

  public async getTotal(): Promise<string> {
    const self = await this.getSelf();
    const total = await self.locator(this.totalSelector).textContent();

    if (total) {
      const index = total.indexOf(':');
      const price = total.substring(index + 1).trim();
      return price;
    }

    throw new Error('Total is missing.');
  }

  public async fillOrderForm(orderInfo: OrderInfo): Promise<void> {
    const self = await this.getSelf();

    const keys = Object.keys(orderInfo);

    for (const key of Object.keys(orderInfo)) {
      const value = orderInfo[key];
      if (value) {
        await self.locator(this.generateSelector(key)).fill(value);
      }
    }
  }

  public async confirmOrder(): Promise<void> {
    await this.getSelf();

    await this.purchase.click();
  }
}
