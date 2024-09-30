import { Page } from '@playwright/test';
import BaseElement from './base-element';

export default class Input extends BaseElement {
  constructor(page: Page, selector: string) {
    super(page, selector);
  }

  public async fillIn(content: string): Promise<void> {
    const self = await this.getSelf();

    await self.fill(content);
  }
}
