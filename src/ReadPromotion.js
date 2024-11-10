import {Console, DateTimes} from '@woowacourse/mission-utils';
import {readFileSync} from 'node:fs';

class ReadPromotion {
  constructor() {
    this.promotions = [];
    this.readPromotion();
  }

  readPromotion() {
    const promotionString = readFileSync('./public/promotions.md', 'utf8').toString().trim().split('\n');
    promotionString.shift();
    promotionString.map((promotion) => {
      const promotionInfo = promotion.split(',');
      if (this.isPromotionPeriod(promotionInfo[3], promotionInfo[4])) this.promotions.push(this.makePromotion(promotionInfo));
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
      buy: Number(promotion[1]),
      get: Number(promotion[2]),
    };
  }
}
export default ReadPromotion;
