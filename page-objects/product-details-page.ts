import { Page } from '@playwright/test';
import BasePage from './base-page';
import Button from '../elements/button';
import ProductDetails from '../elements/product-details';

export default class ProductDetailsPage extends BasePage {
  private addToCartButton: Button;
  public productDetails: ProductDetails;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = new Button(page, '//a[contains(@class,"btn-success")]');
    this.productDetails = new ProductDetails(page);
  }

  public async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
