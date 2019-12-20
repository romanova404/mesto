/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/style.css
var style = __webpack_require__(0);

// CONCATENATED MODULE: ./src/modules/popup/popup.js
class Popup {
    constructor(popupElement) {
      this.popupBlock = popupElement;
      this.popupBlock.querySelector('.popup__close').addEventListener('click', (event) => this.close());
    }
  
    close() {
      this.popupBlock.classList.remove('popup_is-opened');
    }
  }
// CONCATENATED MODULE: ./src/modules/popup/__profile/__user/user.js
class User {
    constructor(name, job) {
      this.name = name;
      this.job = job;
    }
  }
// CONCATENATED MODULE: ./src/modules/validator/element-validator.js
class ElementValidator {
    constructor(elem) {
      this.elem = elem;
      this.errorMessage = document.querySelector(`#error-${this.elem.id}`);
    }
    validate() {
      if (!this.elem.checkValidity()) {
        this.activateError();
        return false;
      }
      this.clean();
      return true;
    };
    activateError() {
      if (this.elem.value.length === 0) {
        this.errorMessage.textContent = "Это обязательное поле";
      } else if (this.elem.classList.contains('popup__input_type_link-url')) {
        this.errorMessage.textContent = "Здесь должна быть ссылка";
      } else {
        this.errorMessage.textContent = "Должно быть от 2 до 30 символов";
      }
    }
    clean() {
      this.errorMessage.textContent = "";
    }
  }
// CONCATENATED MODULE: ./src/modules/popup/__profile/popup-profile.js




class popup_profile_PopupProfile extends Popup {
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
// CONCATENATED MODULE: ./src/modules/popup/__image/image-popup.js


class image_popup_ImagePopup extends Popup {
    constructor(imageBlock) {
      super(imageBlock);
  
    }
    open(imageSrc) {
      this.popupBlock.classList.add('popup_is-opened');
      const imagePop = document.querySelector('.popup__image');
      imagePop.src = imageSrc;
    }
  }
// CONCATENATED MODULE: ./src/modules/popup/__card/__newcard/card.js

const imagePop = new image_popup_ImagePopup(document.querySelector('.popup_image'));
class Card {
    constructor(name, link) {
      this.name = name;
      this.link = link;
    }
  
    like(element) {
      element.classList.toggle('place-card__like-icon_liked');
    }
  
    remove(cardElement) {
      cardElement.parentNode.removeChild(cardElement);
    }
  
    create() {
      const card = document.createElement('div');
      card.classList.add('place-card');
  
      const cardImage = document.createElement('div');
      cardImage.classList.add('place-card__image');
      cardImage.style.backgroundImage = `url(${this.link})`;
      cardImage.addEventListener('click', (event) => {
        if (event.target.classList.contains('place-card__image')) {
          const imageSrc = event.target.style.backgroundImage.slice(5, -2);
          imagePop.open(imageSrc);
        }
      });
  
      card.appendChild(cardImage);
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('place-card__delete-icon');
      deleteButton.addEventListener('click', () => this.remove(card));
  
      cardImage.appendChild(deleteButton);
  
      const cardDescription = document.createElement('div');
      cardDescription.classList.add('place-card__description');
      card.appendChild(cardDescription);
  
      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name');
      cardName.textContent = this.name;
      cardDescription.appendChild(cardName);
  
      const likeButton = document.createElement('button');
      likeButton.classList.add('place-card__like-icon');
      likeButton.addEventListener('click', () => this.like(likeButton));
      cardDescription.appendChild(likeButton);
  
      return card;
    }
  }
// CONCATENATED MODULE: ./src/modules/popup/__card/popup-card.js




class popup_card_PopupCard extends Popup {
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
// CONCATENATED MODULE: ./src/modules/api/api.js
class Api {
    constructor(options) {
  
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
          console.log('Ошибка получения данных профиля:' + err);
        });
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'GET',
        headers: this.headers
      })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
          console.log('Ошибка получения данных карточек:' + err);
        });
    }
  
    updateProfileInfo(userName, userJob) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: userName,
          about: userJob
        })
      })
        .then(res => this.getResponseJson(res))
        .catch((err) => {
          console.log('Ошибка обновления данных профиля' + err);
        });
    }
  
    sendCard(cardName, cardLink) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink,
          likes: []
        })
      })
        .then(res => this.getResponseJson(res))
        .then(res => console.log(res))
        .catch((err) => {
          console.log('Ошибка при добавлении карточки: ' + err);
        });
    }

    getResponseJson(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
// CONCATENATED MODULE: ./src/modules/cardlist/card-list.js

class CardList {
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
// CONCATENATED MODULE: ./src/index.js












const serverUrl = undefined === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';

const cards = document.querySelector('.places-list');

const usernameField = document.querySelector('.user-info__name');
const jobField = document.querySelector('.user-info__job');

const profileBlock = document.querySelector('.popup_edit-profile');
const newProfile = new popup_profile_PopupProfile(profileBlock);
const profileSaveButton = document.querySelector('.popup__button-save');

const profileForm = document.querySelector('.popup__form_edit');
profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userProfile = newProfile.save();
  profileSaveButton.textContent = 'Загрузка...';
  api.updateProfileInfo(userProfile.name, userProfile.job)
    .then((data) => {
      usernameField.textContent = data.name;
      jobField.textContent = data.about;
    })
    .finally(() => {
      profileSaveButton.textContent = 'Сохранить';
    })
  newProfile.close();
});

const profileEditButton = document.querySelector('.user-info__button_edit');
profileEditButton.addEventListener('click', (event) => {
  const userProfile = new User(usernameField.textContent, jobField.textContent);

  newProfile.open(userProfile);
})

const newCardBlock = document.querySelector('.popup_new-card');

const newCard = new popup_card_PopupCard(newCardBlock);
const newCardButton = document.querySelector('.user-info__button');
newCardButton.addEventListener('click', (event) => {
  newCard.open();
})

const cardSubmitButton = document.querySelector('.popup__button_card');
const addCardForm = document.querySelector('.popup__form_card');
addCardForm.addEventListener('submit', (event) => {
  cardSubmitButton.textContent = 'Загрузка...';
  event.preventDefault();
  const makeCard = newCard.add();
  api.sendCard(makeCard.name, makeCard.link)
    .then((data) => {
      newCard.close();
      cardList.addCard(makeCard);
    })
    .finally(() => {
      cardSubmitButton.textContent = '+';
    })  
});


const userPhoto = document.querySelector('.user-info__photo');
const cardList = new CardList(cards);
const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: '81a8b4de-61bd-4e53-bd19-2f997ba16126',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((data) => {
    usernameField.textContent = data.name;
    jobField.textContent = data.about;
    userPhoto.style.backgroundImage = `url(${data.avatar})`;
  });

api.getInitialCards()
  .then((data) => {
    const cardsArray = data.map((item) => {
      return new Card(item.name, item.link);
    });
    cardsArray.forEach((item) => cardList.addCard(item));
  });


/***/ })
/******/ ]);