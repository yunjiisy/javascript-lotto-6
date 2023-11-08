import WinningNumbers from "./WinningNumbers.js";

class CalculateWinnings {
  #results;

  constructor(lottos, inputWinningNumbers, inputBonusNumbers) {
    const winningNumber = new WinningNumbers(
      inputWinningNumbers,
      inputBonusNumbers
    );
    this.lottoTickets = lottos.getLottoTickets();
    this.winningNumbers = winningNumber.getWinningNumbers();
    this.bonusNumber = winningNumber.getBonus();

    this.#results = {
      three: 0,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0,
    };
  }
}

export default CalculateWinnings;