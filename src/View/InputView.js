import { Console } from '@woowacourse/mission-utils';

class InputView {
  purchaseList;
  constructor() {
    // this.readItem();
  }

  async readItem() {
    const input = await Console.readLineAsync(
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n'
    );
    this.validationForm(input);
  }

  validationForm(input) {
    this.purchaseList = [];
    const pattern = /^\[[\p{L}]+-\d+\](,\[[\p{L}]+-\d+\])*$/u;
    try {
      if (!input.match(pattern))
        throw new Error(
          '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.'
        );
      this.makePurchaseArr(input);
    } catch (err) {
      Console.print(err);
      this.readItem();
    }
  }

  makePurchaseArr(input) {
    input.split(',').map((purchase) => {
      const removeParentheses = purchase
        .slice(1, purchase.length - 1)
        .split('-');
      this.purchaseList.push({
        name: removeParentheses[0],
        amount: Number(removeParentheses[1]),
      });
    });
  }
}
export default InputView;
