import { Console } from '@woowacourse/mission-utils';

class InputView {
  constructor() {
    this.readItem();
  }

  async readItem() {
    const input = await Console.readLineAsync(
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n'
    );
    this.validationForm(input);
  }

  validationForm(input) {
    const pattern = /^\[[\p{L}]+-\d+\](,\[[\p{L}]+-\d+\])*$/u;
    try {
      if (!input.match(pattern))
        throw new Error(
          '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.'
        );
    } catch (err) {
      Console.print(err);
      this.readItem();
    }
  }
}
export default InputView;
