import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";
import { Message } from "./Message.js";

class Game {
  constructor({
    player,
    table,
    hitButton,
    standButton,
    playerPoints,
    dealerPoints,
    messageBox,
  }) {
    this.playerPoints = playerPoints;
    this.dealerPoints = dealerPoints;
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.messageBox = messageBox;
    this.player = player;
    this.dealer = new Player("Dealer");
    this.table = table;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener("click", (event) => this.hitCard());
    this.standButton.addEventListener("click", (event) => this.dealerPlays());
    this.dealCards();
  }

  hitCard() {
    let card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayerCard(card);
    this.playerPoints.innerHTML = this.player.calculatePoints();
  }

  dealCards() {
    for (let n = 0; n < 2; n++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.showPlayerCard(card1);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealerCard(card2);
    }

    this.playerPoints.innerHTML = this.player.calculatePoints();
    this.dealerPoints.innerHTML = this.dealer.calculatePoints();
  }

  dealerPlays() {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      let card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealerCard(card);
      this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }

    this.endGame();
  }

  endGame() {
    this.hitButton.removeEventListener("click", (event) => this.hitCard());
    this.standButton.removeEventListener("click", (event) =>
      this.dealerPlays()
    );

    this.hitButton.style.display = "none";
    this.standButton.style.display = "none";

    if (this.player.points < 21 && this.player.points == this.dealer.points) {
      this.messageBox.setText("Remis").show();

      return;
    }

    if (this.player.points > 21) {
      this.messageBox.setText("Wygrywa Dealer").show();
      return;
    }

    if (this.dealer.points > 21) {
      this.messageBox.setText("Wygrywa Player").show();

      return;
    }

    if (this.player.points < this.dealer.points) {
      this.messageBox.setText("Wygrywa Dealer").show();

      return;
    }
  }
}

const table = new Table(
  document.getElementById("playersCards"),
  document.getElementById("dealersCards")
);
const messageBox = new Message(document.getElementById("message"));
const player = new Player("Player");

const game = new Game({
  hitButton: document.getElementById("hit"),
  standButton: document.getElementById("stand"),
  playerPoints: document.getElementById("playerPoints"),
  dealerPoints: document.getElementById("dealerPoints"),
  player,
  table,
  messageBox,
});
game.run();
