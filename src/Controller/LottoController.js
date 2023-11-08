import Output from "../View/Output.js";
import Input from "../View/Input.js";
import Lottos from "../Model/Lottos.js";
import Calculate from "../Model/Calculate.js";
import { Console } from "@woowacourse/mission-utils";

class LottoController {
  constructor() {
    this.input = new Input();
    this.output = new Output();
    this.lottos = new Lottos();
  }

  async lottoGame() {
    const purchaseAmount = await this.getValidPurchaseAmount();
    this.createAndPrintLottoInfo(purchaseAmount);

    const [inputWinningNumbers, inputBonusNumber] = await this.getInputWinningNumbersAndBonusNumber();
    this.calculateAndPrintResults(purchaseAmount, inputWinningNumbers, inputBonusNumber);
  }

  async getValidPurchaseAmount() {
    let purchaseAmount;
    while (true) {
      try {
        purchaseAmount = await this.input.getPurchaseAmount();
        if (!this.lottos.validatePurchaseAmount(purchaseAmount)) {
          throw new Error("[ERROR] 유효한 구매 금액을 입력하세요.");
        }
        break;
      } catch (error) {
        this.output.printErrorMesage(error.message);
      }
    }
    return purchaseAmount;
  }

  createAndPrintLottoInfo(purchaseAmount) {
    this.lottos.createLottos(purchaseAmount);
    this.output.printPurchaseQuantity(this.lottos.getLottoQuantity());
    this.output.printLottoTickets(this.lottos.getLottoTickets());
  }

  async getInputWinningNumbersAndBonusNumber() {
    const inputWinningNumbers = await this.input.getWinningNumbers();
    const inputBonusNumber = await this.input.getBonusNumber();
    return [inputWinningNumbers, inputBonusNumber];
  }

  calculateAndPrintResults(purchaseAmount, inputWinningNumbers, inputBonusNumber) {
    this.calculate = new Calculate(this.lottos, inputWinningNumbers, inputBonusNumber);
    this.calculate.caculateResults();
    this.calculate.calculateProfitRate(purchaseAmount);
    this.output.printWinningResult(this.calculate.getResults());
    this.output.printProfitRate(this.calculate.getProfitRate());
  }
}


export default LottoController;

const start = new LottoController();
start.lottoGame();