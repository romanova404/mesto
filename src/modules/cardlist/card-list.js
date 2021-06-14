export class CardList {
    constructor(container) {
      this.container = container;
      this.cardArray = [];
    }
    addCard(card) {
      this.cardArray.push(card);
      const cardDom = card.create();
      this.container.appendChild(cardDom);
    }
  }