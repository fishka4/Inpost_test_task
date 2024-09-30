import { Page } from '@playwright/test';
import { ProductInfo } from '../types/product-info.type';
import BaseElement from './base-element';

export default class OrdersTable extends BaseElement {
  private readonly rowSelector = '#tbodyid tr';
  private readonly titleCellSelector = 'td:nth-child(2)';
  private readonly priceCellSelector = 'td:nth-child(3)';

  constructor(page: Page) {
    super(page, '//table');
  }

  public async getOrderedProuctInfo(orderTitle: string): Promise<ProductInfo> {
    const self = await this.getSelf();

    await self.locator(this.rowSelector).waitFor({ state: 'attached' });

    const rows = await self.locator(this.rowSelector).all();

    for (let i = 0; i <= rows.length; i++) {
      const title = await rows[i].locator(this.titleCellSelector).textContent();
      const price = await rows[i].locator(this.priceCellSelector).textContent();

      if (title === orderTitle && price) {
        return {
          title: title.trim(),
          price: price.trim(),
        };
      }
    }

    throw new Error(`${orderTitle} is not found.`);
  }
}
