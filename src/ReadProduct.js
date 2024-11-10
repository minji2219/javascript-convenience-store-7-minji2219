import {Console} from '@woowacourse/mission-utils';
import {readFileSync} from 'node:fs';

class ReadProduct {
  products;

  constructor() {
    this.readMarkdown();
    this.addNonPromotionalProducts();
  }

  readMarkdown() {
    const productsString = readFileSync('./public/products.md', 'utf8').toString().trim().split('\n');
    this.products = productsString.map((product) => this.makeProduct(product.trim().split(',')));
    this.products.shift();
  }

  isPromotion(info) {
    if (info === 'null') return null;
    return info;
  }

  makeProduct(product) {
    return {
      name: product[0],
      price: Number(product[1]),
      amount: Number(product[2]),
      promotion: this.isPromotion(product[3]),
    };
  }

  addNonPromotionalProducts() {
    const newProducts = [];

    for (let i = 0; i < this.products.length; i++) {
      newProducts.push(this.products[i]);
      if (this.products[i].promotion) {
        if (this.products[i].name !== this.products[i + 1].name) {
          newProducts.push({
            name: this.products[i].name,
            price: this.products[i].price,
            amount: 0,
            promotion: null,
          });
        }
      }
    }

    this.products = newProducts;
  }
}

export default ReadProduct;
