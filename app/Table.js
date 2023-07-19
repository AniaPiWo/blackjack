export class Table {
  constructor(playersCards, dealersCards) {
    this.playersCards = playersCards;
    this.dealersCards = dealersCards;
  }

  showPlayerCard(card) {
    this.playersCards.appendChild(card.render());
  }

  showDealerCard(card) {
    this.dealersCards.appendChild(card.render());
  }
}
