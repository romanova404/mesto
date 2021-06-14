import {Popup} from '../popup.js';
import {Card} from './__newcard/card.js';
import {ElementValidator} from '../../validator/element-validator.js';

export class PopupCard extends Popup {
    constructor(newCardBlock) {
      super(newCardBlock)
      this.newName = newCardBlock.querySelector('.popup__input_type_name');
      this.newLink = newCardBlock.querySelector('.popup__input_type_link-url');
      this.newName.addEventListener('input', (event) => this.validateForm());
      this.newLink.addEventListener('input', (event) => this.validateForm());
      this.addButton = newCardBlock.querySelector('.popup__button_card');
    }
    open() {
      document.forms.new.reset();
      this.popupBlock.classList.add('popup_is-opened');
      this.nameValidator = new ElementValidator(this.newName);
      this.linkValidator = new ElementValidator(this.newLink);
      this.nameValidator.clean();
      this.linkValidator.clean();
    }
    add() {
      return new Card(this.newName.value, this.newLink.value);
    }
    validateForm() {
      const isNameValid = this.nameValidator.validate();
      const isLinkValid = this.linkValidator.validate();
      const isValidForm = isNameValid && isLinkValid;
      if (isValidForm) {
        this.addButton.removeAttribute('disabled');
      } else {
        this.addButton.setAttribute('disabled', true);
      }
    }
  }