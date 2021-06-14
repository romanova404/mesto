export class Popup {
    constructor(popupElement) {
      this.popupBlock = popupElement;
      this.popupBlock.querySelector('.popup__close').addEventListener('click', (event) => this.close());
    }
  
    close() {
      this.popupBlock.classList.remove('popup_is-opened');
    }
  }