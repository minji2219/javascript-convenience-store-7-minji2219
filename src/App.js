import OutputView from './View/OutputView.js';
import InputView from './View/InputView.js';
import InventoryManagement from './InventoryManagement.js';
import ReadPromotion from './ReadPromotion.js';
import Purchase from './Purchase.js';
import Receipt from './View/Receipt.js';
import {Console} from '@woowacourse/mission-utils';

class App {
  async run() {
    //현재 재고 리스트
    const inventory = new OutputView();
    let continueShopping = true;

    while (continueShopping) {
      //구매할 리스트
      inventory.startGuide();
      const purchase = new InputView();
      await purchase.readItem();

      //재고 관리(재고 여부 확인)
      const inventoryManagement = new InventoryManagement(inventory.products, purchase.purchaseList);

      //프로모션 리스트
      const promotion = new ReadPromotion();

      const purchaseInstance = new Purchase(inventory.products, purchase.purchaseList, inventoryManagement.purchaseIndexList, promotion.promotions);
      await purchaseInstance.initialize();

      inventoryManagement.recountInventory(purchaseInstance.promotionBuy, purchaseInstance.commonBuy);

      const confirm = await Console.readLineAsync('\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n');

      if (confirm.toLowerCase() !== 'y') continueShopping = false;
    }
  }
}

export default App;
