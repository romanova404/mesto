import {Card} from '../popup/__card/__newcard/card.js'
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