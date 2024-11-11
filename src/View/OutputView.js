import {Console} from '@woowacourse/mission-utils';
import ReadProduct from '../ReadProduct.js';

class OutputView {
  products;

  constructor() {
    this.products = new ReadProduct().products;
  }

  makeProductsString() {
    this.products.map((product) => Console.print('- ' + product.name + ' ' + product.price.toLocaleString() + '원 ' + this.outOfStock(product.amount) + ' ' + this.isPromotion(product.promotion)));
  }

  isPromotion(info) {
    if (info) return info;
    return '';
  }

  outOfStock(info) {
    if (info === 0) return '재고 없음';
    return info + '개';
  }

  startGuide() {
    Console.print('\n안녕하세요. W편의점입니다.');
    Console.print('현재 보유하고 있는 상품입니다.\n');
    this.makeProductsString();
  }
}
export default OutputView;
