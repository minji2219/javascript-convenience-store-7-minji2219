import {Console} from '@woowacourse/mission-utils';
import Discount from './Discount.js';
import Receipt from './View/Receipt.js';

class Purchase {
  constructor(inventory, purchaseItem, purchaseIndex, promotions) {
    this.promotionBuy = [];
    this.commonBuy = [];
    this.promotionIndex = [];
    this.presentation = [];
    this.discount;
    this.inventory = inventory;
    this.purchaseItems = purchaseItem;
    this.itemIndex = purchaseIndex;
    this.promotions = promotions;
  }

  async initialize() {
    await this.purchase();
  }

  async purchase() {
    for (let index = 0; index < this.itemIndex.length; index++) {
      const inventoryIndex = this.itemIndex[index];
      this.promotionIndex[index] = this.isPromotion(this.inventory[inventoryIndex].promotion);
      if (this.promotionIndex[index] > -1) {
        await this.promotionCount(inventoryIndex, this.promotionIndex[index], index);
      }
      //프로모션이 없을 때
      else {
        this.presentation.push(null);
        this.promotionBuy.push(0);
        this.commonBuy.push(this.purchaseItems[index].amount);
      }
    }
    await this.isMembership();
    await this.printReceipt();
  }

  isPromotion(info) {
    return this.promotions.findIndex((promotion) => promotion.name === info);
  }

  //프로모션 적용되는 상품의 수 구하는 함수
  async promotionCount(inventoryIndex, promotionIndex, purchaseIndex) {
    const buyName = this.purchaseItems[purchaseIndex].name;
    const buyAmount = this.purchaseItems[purchaseIndex].amount; //i번째 상품을 구매하려는 수
    const realAmount = this.inventory[inventoryIndex].amount; //i번째 상품(프로모션)의 실제 수량
    const buy = this.promotions[promotionIndex].buy; //i번째 상품 프로모션 buy
    const get = this.promotions[promotionIndex].get; //i번째 상품 프로모션 get

    //프로모션 상품에서 모두 구매가능할 경우
    if (realAmount > buyAmount) {
      if ((await this.isRightCount(buyName, buyAmount, buy, get)) === 'Y') {
        this.promotionBuy.push(buyAmount + 1);
      } else {
        this.promotionBuy.push(buyAmount);
      }
      this.commonBuy.push(0);
    }
    //프로모션 + 일반 상품에서 구매가능할 경우
    else if (realAmount <= buyAmount) {
      //realAmount / 했을 때 오류 없이 하려고
      if (realAmount === 0) {
        this.promotionBuy[purchaseIndex] = 0;
        this.commonBuy[purchaseIndex] = buyAmount;
      }
      this.promotionBuy[purchaseIndex] = (buy + get) * parseInt(realAmount / (buy + get));
      const promotionCount = realAmount - this.promotionBuy[purchaseIndex];

      if (promotionCount > 0) {
        const confirm = await Console.readLineAsync(`\n현재 ${buyName} ${buyAmount - this.promotionBuy[purchaseIndex]}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)\n`);
        if (confirm.toLowerCase() === 'y') {
          this.promotionBuy[purchaseIndex] += promotionCount;
          this.commonBuy.push(buyAmount - this.promotionBuy);
        } else {
          this.commonBuy.push(0);
        }
      }
    }
    this.presentation.push(parseInt(this.promotionBuy[purchaseIndex] / (get + buy)));
  }

  async isRightCount(buyName, buyAmount, buy, get) {
    if (buyAmount === buy && buyAmount % (buy + get) !== 0) {
      return await Console.readLineAsync(`\n현재 ${buyName}은(는) ${get}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)\n`);
    }
    return 'N';
  }

  async isMembership() {
    const confirm = await Console.readLineAsync(`\n멤버십 할인을 받으시겠습니까? (Y/N)\n`);
    const discount = new Discount(this.promotionBuy, this.commonBuy, this.inventory, this.itemIndex, this.presentation);
    if (confirm.toLowerCase() === 'y') {
      return (this.discount = {
        event: discount.eventDiscounts,
        membership: discount.membershipDiscounts,
      });
    }
    return (this.discount = {
      event: discount.eventDiscounts,
      membership: 0,
    });
  }

  async printReceipt() {
    new Receipt(this.inventory, this.itemIndex, this.commonBuy, this.promotionBuy, this.presentation, this.discount);
  }
}
export default Purchase;
