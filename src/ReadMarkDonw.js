import { readFileSync } from 'node:fs';

class ReadMarkDown {
  products;

  constructor() {
    this.readMarkdown();
  }

  readMarkdown() {
    const productsString = readFileSync('./public/products.md', 'utf8')
      .toString()
      .trim()
      .split('\n');
    this.products = productsString.map((product) =>
      this.makeProduct(product.trim().split(','))
    );
    this.products.shift();
  }

  makeProduct(product) {
    return {
      name: product[0],
      price: product[1],
      amount: product[2],
      promotion: product[3],
    };
  }
}
export default ReadMarkDown;
