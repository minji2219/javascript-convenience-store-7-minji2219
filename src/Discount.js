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
    this.promotionBuy.map((buy, index) => {
      const price = this.inventory[this.purchaseIndex[index]].price;
      this.eventDiscounts += price * this.presentation[index];
    });
    this.eventDiscounts;
  }

  membershipDiscount() {
    this.commonBuy.map((buy, index) => {
      this.membershipDiscounts += this.inventory[this.purchaseIndex[index]].price * Number(buy);
    });
    this.membershipDiscounts *= 0.3;
    if (this.membershipDiscounts > 8000) return 8000;
    return this.membershipDiscounts;
  }
}
export default Discount;
