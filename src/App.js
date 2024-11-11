import OutputView from './View/OutputView.js';
import InputView from './View/InputView.js';
import InventoryManagement from './InventoryManagement.js';
import ReadPromotion from './ReadPromotion.js';
import Purchase from './Purchase.js';
import {Console} from '@woowacourse/mission-utils';

class App {
  async run() {
    const inventory = new OutputView();
    let continueShopping = true;

    while (continueShopping) {
      inventory.startGuide();
      const purchase = new InputView();
      await purchase.readItem();

      const inventoryManagement = new InventoryManagement(inventory.products, purchase.purchaseList);

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
