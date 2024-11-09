import { Console, DateTimes } from '@woowacourse/mission-utils';
import { readFileSync } from 'node:fs';

class Promotion {
  constructor(purchaseIndex) {
    this.promotions = [];
    this.readPromotion();
  }

  readPromotion() {
    const promotionString = readFileSync('./public/promotions.md', 'utf8')
      .toString()
      .trim()
      .split('\n');
    promotionString.shift();
    promotionString.map((promotion) => {
      const promotionInfo = promotion.split(',');
      if (this.isPromotionPeriod(promotionInfo[3], promotionInfo[4]))
        this.promotions.push(this.makePromotion(promotionInfo));
    });
  }

  isPromotionPeriod(start, end) {
    let today = DateTimes.now();
    if (today >= new Date(start) && today <= new Date(end)) {
      return true;
    }
    return false;
  }

  makePromotion(promotion) {
    return {
      name: promotion[0],
      buy: promotion[1],
      get: promotion[2],
    };
  }
  //1. 프로모션 상품인 경우, 수량이 남아있다면
  //프로모션 기간 여부를 확인하고 프로모션 적용이 되는지 확인한다.
  //적용이 된다면,
  //2. 수량이 없다면
}
export default Promotion;
