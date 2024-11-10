//필요한거
//1. 각 상품의 총 수량, 상품명, 금액
//2. 증정 상품이 있을 경우 증정 상품 출력
//3. 행사할인, 멤버십할인 금액

import {Console} from '@woowacourse/mission-utils';

class Receipt {
  constructor(inventory, itemIndex, commonBuy, promotionBuy, presentation, discount) {
    this.inventory = inventory;
    this.itemIndex = itemIndex;
    this.commonBuy = commonBuy;
    this.promotionBuy = promotionBuy;
    this.presentation = presentation;
    this.discount = discount;
    this.totalAmount = 0;
    this.totalPrice = 0;
    this.printReceipt();
  }

  printReceipt() {
    Console.print('==============W 편의점================');
    Console.print('상품명'.padEnd(18, ' ') + '수량'.padEnd(10, ' ') + '금액');
    this.printPurchase();
    Console.print('=============증    정===============');
    this.printPresentation();
    Console.print('====================================');
    this.printTotal();
  }

  printPurchase() {
    this.itemIndex.map((item, index) => {
      const productName = this.inventory[item].name;
      const amount = this.promotionBuy[index] + this.commonBuy[index];
      const price = this.inventory[item].price * amount;
      this.totalAmount += amount;
      this.totalPrice += price;
      Console.print(productName.padEnd(18, ' ') + amount.toString().padEnd(10, ' ') + price.toLocaleString());
    });
  }

  printPresentation() {
    this.itemIndex.map((item, index) => {
      if (this.presentation[index]) {
        const productName = this.inventory[item].name;
        const amount = this.presentation[index];
        Console.print(productName.padEnd(18, ' ') + amount.toString().padEnd(10, ' '));
      }
    });
  }

  printTotal() {
    const payPrice = this.totalPrice - this.discount.event - this.discount.membership;
    Console.print('총구매액'.padEnd(18, ' ') + this.totalAmount.toString().padEnd(10, ' ') + this.totalPrice.toLocaleString());
    Console.print('행사할인'.padEnd(28, ' ') + '-' + this.discount.event.toLocaleString());
    Console.print('멤버십할인'.padEnd(28, ' ') + '-' + this.discount.membership.toLocaleString());
    Console.print('내실돈'.padEnd(28, ' ') + payPrice.toLocaleString());
  }
}
export default Receipt;
