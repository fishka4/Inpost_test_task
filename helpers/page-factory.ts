// simple PageFactory implementation just to avoid tons of different page objects import in spec files.

import { Page } from '@playwright/test';
import MainPage from '../page-objects/main-page';
import ProductDetailsPage from '../page-objects/product-details-page';
import CartPage from '../page-objects/cart-page';

export default class PageFactory {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getMainPage(): MainPage {
    return new MainPage(this.page);
  }

  public getProductDetailsPage(): ProductDetailsPage {
    return new ProductDetailsPage(this.page);
  }

  public getCartPage(): CartPage {
    return new CartPage(this.page);
  }

  // public getShoppingCartPage(): ShoppingCartPage {
  //   return new ShoppingCartPage(this.page);
  // }
}
