// 멤버십 할인
// 멤버십 회원은 프로모션 미적용 금액의 30%를 할인받는다.
// 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
// 멤버십 할인의 최대 한도는 8,000원이다.

import {Console} from '@woowacourse/mission-utils';

class Discount {
  constructor(promotionBuy, commonBuy, inventory, purchaseIndex, presentation) {
    this.membershipDiscounts = 0;
    this.eventDiscounts = 0;
    this.promotionBuy = promotionBuy;
    this.commonBuy = commonBuy;
    this.inventory = inventory;
    this.purchaseIndex = purchaseIndex;
    this.presentation = presentation;

    this.eventDiscount();
    this.membershipDiscount();
  }

  eventDiscount() {
    Console.print(this.presentation);
    this.promotionBuy.map((buy, index) => {
      Console.print(this.presentation);
      const price = this.inventory[this.purchaseIndex[index]].price;
      this.eventDiscounts += price * this.presentation[index];
    });
    Console.print('이벤트 할인' + this.eventDiscounts);
    this.eventDiscounts;
  }

  membershipDiscount() {
    this.commonBuy.map((buy, index) => {
      this.membershipDiscounts += this.inventory[this.purchaseIndex[index]].price * Number(buy);
    });
    this.membershipDiscounts *= 0.3;
    Console.print('멤버십' + this.membershipDiscounts);
    if (this.membershipDiscounts > 8000) return 8000;
    return this.membershipDiscounts;
  }
}
export default Discount;
