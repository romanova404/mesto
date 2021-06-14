import {Popup} from '../popup.js';
import {User} from './__user/user.js';
import {ElementValidator} from '../../validator/element-validator.js';

export class PopupProfile extends Popup {
    constructor(profileBlock) {
      super(profileBlock);
      this.newUsername = profileBlock.querySelector('.popup__input_type_username');
      this.newJob = profileBlock.querySelector('.popup__input_type_job');
      this.newUsername.addEventListener('input', (event) => this.validateForm());
      this.newJob.addEventListener('input', (event) => this.validateForm());
      this.saveProfileButton = profileBlock.querySelector('.popup__button-save');
    }
    open(user) {
      this.popupBlock.classList.add('popup_is-opened');
      this.newUsername.value = user.name;
      this.newJob.value = user.job;
      this.usernameValidator = new ElementValidator(this.newUsername);
      this.jobValidator = new ElementValidator(this.newJob);
      this.usernameValidator.clean();
      this.jobValidator.clean();
    }
    save() {
      return new User(this.newUsername.value, this.newJob.value);
    }
  
    validateForm() {
      const isUsernameValid = this.usernameValidator.validate();
      const isJobValid = this.jobValidator.validate();
      const isValidForm = isUsernameValid && isJobValid;
      if (isValidForm) {
        this.saveProfileButton.removeAttribute('disabled');
      } else {
        this.saveProfileButton.setAttribute('disabled', true);
      }
    }
  }