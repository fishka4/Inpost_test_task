import { test, expect } from '@playwright/test';
import PageFactory from '../helpers/page-factory';
import { ProductInfo } from '../types/product-info.type';
import { OrderInfo } from '../types/order-info.type';

test.describe('Title', () => {
  const orderDetails: OrderInfo = {
    name: 'Tester Testerov',
    country: 'USA',
    city: 'Boston',
    card: '1234123412341234',
    month: '5',
    year: '2026',
  };
  let pageFactory: PageFactory;

  test.beforeEach(async ({ page }) => {
    pageFactory = new PageFactory(page);

    // Primary task: Launch the preferred browser and Navigate to the specified website URL
    await pageFactory.getMainPage().navigateTo();
  });

  test('Search', async () => {
    const category = 'Phones';
    const total = '800';
    const orderInfo: ProductInfo = {
      title: 'Samsung galaxy s7',
      price: '$800',
    };
    const mainPage = pageFactory.getMainPage();

    await mainPage.categories.filterByCategory(category);

    const cardInfo = await mainPage.cardsTable.getCardInfo(orderInfo.title);

    expect(cardInfo).toEqual(orderInfo);

    await mainPage.cardsTable.openCard(orderInfo.title);

    const productDetailsPage = pageFactory.getProductDetailsPage();
    const productInfo = await productDetailsPage.productDetails.getProductInfo();

    expect(productInfo).toEqual(orderInfo);

    await productDetailsPage.addToCart();
    await productDetailsPage.navHeader.openCart();

    const cartPage = pageFactory.getCartPage();

    const info = await cartPage.ordersTable.getOrderedProuctInfo(orderInfo.title);

    expect(info.title).toEqual(orderInfo.title);
    expect(info.price).toEqual(total);

    const orderTotal = await cartPage.getTotalOrderPrice();

    expect(orderTotal).toEqual(total);

    await cartPage.placeOrder();

    const finalTotal = await cartPage.placeOrderForm.getTotal();

    expect(finalTotal).toEqual(total);

    await cartPage.placeOrderForm.fillOrderForm(orderDetails);

    await cartPage.placeOrderForm.confirmOrder();

    const confirmation = await cartPage.orderConfirmation.getConfirmationDetails();

    expect(confirmation.id).toBeDefined();
    expect(confirmation.amount.includes(total)).toBe(true);
    expect(confirmation.card).toEqual(orderDetails.card);
    expect(confirmation.name).toEqual(orderDetails.name);
    expect(confirmation.date).toBeDefined();

    await cartPage.orderConfirmation.confirmOrder();
  });
});
