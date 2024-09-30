import { Page } from '@playwright/test';
import { ConfirmationInfo } from '../types/confirmation-info';
import BaseElement from './base-element';
import Button from './button';

export default class OrderConfirmation extends BaseElement {
  private infoTextSelector = '.lead.text-muted';
  private okButton: Button;

  constructor(page: Page) {
    super(page, '//div[starts-with(@class,"sweet-alert")]');
    this.okButton = new Button(page, '//button[text()="OK"]');
  }

  public async getConfirmationDetails(): Promise<ConfirmationInfo> {
    const self = await this.getSelf();
    const infoHtml = await self.locator(this.infoTextSelector).innerHTML();

    if (!infoHtml) {
      throw new Error('Confirmation info not found');
    }

    const infoText = infoHtml.replace(/<br\s*\/?>/gi, '\n').trim();
    const lines = infoText.split('\n').map((line) => line.trim());

    if (lines.length < 5) {
      throw new Error('Insufficient confirmation info found');
    }

    const confirmationInfo: ConfirmationInfo = {
      id: lines[0].replace('Id: ', '').trim(),
      amount: lines[1].replace('Amount: ', '').trim(),
      card: lines[2].replace('Card Number: ', '').trim(),
      name: lines[3].replace('Name: ', '').trim(),
      date: lines[4].replace('Date: ', '').trim(),
    };

    return confirmationInfo;
  }

  public async confirmOrder(): Promise<void> {
    await this.getSelf();

    await this.okButton.click();
  }
}
