import {Popup} from '../popup.js';

export class ImagePopup extends Popup {
    constructor(imageBlock) {
      super(imageBlock);
  
    }
    open(imageSrc) {
      this.popupBlock.classList.add('popup_is-opened');
      const imagePop = document.querySelector('.popup__image');
      imagePop.src = imageSrc;
    }
  }