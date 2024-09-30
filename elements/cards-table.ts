import { Page } from '@playwright/test';
import BaseElement from './base-element';
import { ProductInfo } from '../types/product-info.type';

export default class CardsTable extends BaseElement {
  private readonly cardSelector = '.card';
  private readonly cardTitleSelector = 'h4[class="card-title"]';
  private readonly cardPriceSelector = 'h5';

  constructor(page: Page) {
    super(page, 'div[id="tbodyid"]');
  }

  public async getCardInfo(title: string): Promise<ProductInfo> {
    const self = await this.getSelf();

    await self.locator(this.cardSelector, { hasText: title }).waitFor({ state: 'visible' });
    const products = self.locator(this.cardSelector);
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const productTitle = await product.locator(this.cardTitleSelector).textContent();

      if (productTitle?.trim() === title) {
        const orderPrice = await product.locator(this.cardPriceSelector).textContent();

        return {
          title: productTitle.trim(),
          price: orderPrice?.trim() || 'Price not found',
        };
      }
    }
    throw new Error(`${title} order is not found.`);
  }

  public async openCard(title: string): Promise<void> {
    const self = await this.getSelf();

    await self.locator(this.cardTitleSelector, { hasText: title }).click();
  }
}
