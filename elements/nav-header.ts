import { Page } from '@playwright/test';
import BaseElement from './base-element';
import Button from './button';

export default class NavHeader extends BaseElement {
  private cartButton: Button;

  constructor(page: Page) {
    super(page, '//nav[starts-with(@class,"navbar")]');
    this.cartButton = new Button(page, 'a[id="cartur"]');
  }

  public async openCart(): Promise<void> {
    await this.getSelf();

    await this.cartButton.click();
  }
}
