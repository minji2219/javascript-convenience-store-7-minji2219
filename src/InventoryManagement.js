import {Console} from '@woowacourse/mission-utils';

class InventoryManagement {
  constructor(inventory, purchase) {
    this.inventory = inventory;
    this.purchaseItems = purchase;
    this.purchaseIndexList = [];

    this.checkCanPurchase();
  }

  checkCanPurchase() {
    try {
      this.purchaseItems.forEach((item) => {
        this.checkExistence(item);
      });
    } catch (err) {
      Console.print(err);
      //다시 입력 받기
    }
  }

  //존재하는 상품을 입력했는지
  checkExistence(item) {
    const index = this.inventory.findIndex((product) => product.name === item.name);
    if (index === -1) throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
    this.purchaseIndexList.push(index);
    this.checkAmount(index, item.amount);
  }

  //재고 수량을 초과하지 않는지
  checkAmount(index, amount) {
    let totalAmount = this.inventory[index].amount;
    if (this.inventory[index].promotion !== 'null') totalAmount += this.inventory[index + 1].amount;

    try {
      if (totalAmount < amount) {
        throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
      }
    } catch (err) {
      Console.print(err.message);
    }
  }

  recountInventory(promotionBuy, commonBuy) {
    this.purchaseIndexList.map((purchaseIndex, index) => {
      if (promotionBuy[index] > 0) {
        this.inventory[purchaseIndex].amount -= promotionBuy[index];
        this.inventory[purchaseIndex + 1].amount -= commonBuy[index];
      } else {
        this.inventory[purchaseIndex].amount -= commonBuy[index];
      }
    });
    // Console.print(this.inventory);
  }
}

export default InventoryManagement;
