import { Page } from '@playwright/test';
import NavHeader from '../elements/nav-header';
import DialogHandler from '../helpers/dialog-handler';

export default class BasePage {
  protected page: Page;
  public navHeader: NavHeader;

  constructor(page: Page) {
    this.page = page;
    this.navHeader = new NavHeader(page);

    DialogHandler.registerHandler(page);
  }

  public async navigateTo(url?: string): Promise<void> {
    if (url) {
      await this.page.goto(url);
    } else {
      await this.page.goto('/');
    }
  }
}
