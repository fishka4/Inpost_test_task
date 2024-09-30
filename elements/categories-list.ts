import { Page } from '@playwright/test';
import BaseElement from './base-element';

export default class CategoriesList extends BaseElement {
  private readonly categoryBaseSelector = 'a[class="list-group-item"]';

  constructor(page: Page) {
    super(page, 'div[class="list-group"]');
  }

  public async filterByCategory(category: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    const self = await this.getSelf();

    await self.locator(this.categoryBaseSelector, { hasText: category }).click();
  }
}
