import { Console } from '@woowacourse/mission-utils';
import ReadProduct from '../ReadProduct.js';

class OutputView {
  products;

  constructor() {
    this.products = new ReadProduct().products;
    this.startGuide();
  }

  makeProductsString() {
    this.products.map((product) =>
      Console.print(
        '- ' +
          ' ' +
          product.name +
          ' ' +
          product.price +
          '원 ' +
          product.amount +
          '개 ' +
          this.isPromotion(product.promotion)
      )
    );
  }

  isPromotion(info) {
    if (info === 'null') return '';
    return info;
  }

  startGuide() {
    Console.print('안녕하세요. W편의점입니다.');
    Console.print('현재 보유하고 있는 상품입니다.\n');
    this.makeProductsString();
  }
}
export default OutputView;
