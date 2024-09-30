import { Page } from '@playwright/test';
import BasePage from './base-page';
import CardsTable from '../elements/cards-table';
import CategoriesList from '../elements/categories-list';

export default class MainPage extends BasePage {
  private static instance: MainPage | null = null;
  public categories: CategoriesList;
  public cardsTable: CardsTable;

  constructor(page: Page) {
    if (MainPage.instance) {
      return MainPage.instance;
    }

    super(page);
    this.categories = new CategoriesList(page);
    this.cardsTable = new CardsTable(page);
    MainPage.instance = this;
  }
}
