import { Console } from '@woowacourse/mission-utils';
import { readFileSync } from 'node:fs';

class OutputView {
  products;
  constructor() {
    this.readMarkdown();
  }

  readMarkdown() {
    const productsString = readFileSync('./public/products.md', 'utf8')
      .toString()
      .trim()
      .split('\n');
    this.products = productsString.map((product) => product.trim().split(','));
  }
}
export default OutputView;
