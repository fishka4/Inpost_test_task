import { Page } from '@playwright/test';
import { ProductInfo } from '../types/product-info.type';
import BaseElement from './base-element';

export default class ProductDetails extends BaseElement {
  private readonly titleSelector = 'h2[class="name"]';
  private readonly priceSelector = 'h3[class=price-container]';

  constructor(page: Page) {
    super(page, '//div[starts-with(@class,"product-content")]');
  }

  public async getProductInfo(): Promise<ProductInfo> {
    const self = await this.getSelf();

    const productTitle = await self.locator(this.titleSelector).textContent();
    const productPrice = await self.locator(this.priceSelector).textContent();

    if (productTitle && productPrice) {
      return {
        title: productTitle.trim(),
        price: productPrice.trim().split('*')[0].trim(),
      };
    }

    throw new Error('Product info is not found.');
  }
}
