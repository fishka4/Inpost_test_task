import { BrowserType, Page } from '@playwright/test';

export default class DialogHandler {
  public static registerHandler(page: Page) {
    const browser = page.context().browser();

    if (!browser) {
      throw new Error('Can not define browser from context.');
    }

    const browserType = browser.browserType();
    const name = browserType.name();

    if (name === 'chromium') {
      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });
    }
  }
}
