import { Locator, Page } from '@playwright/test';

export default class BaseElement {
  private page: Page;
  private selfSelector: string;

  constructor(page: Page, selector: string) {
    this.page = page;
    this.selfSelector = selector;
  }

  protected async getSelf(): Promise<Locator> {
    await this.page.locator(this.selfSelector).waitFor({ state: 'visible' });

    return this.page.locator(this.selfSelector);
  }
}
