import { Page } from '@playwright/test';
import BaseElement from './base-element';

export default class Button extends BaseElement {
  constructor(page: Page, selector: string) {
    super(page, selector);
  }

  public async click(): Promise<void> {
    const self = await this.getSelf();

    await self.click({ force: true });
  }
}
