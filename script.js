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


class CardList {
  constructor(container, cardArray) {
    this.container = container;
    this.cardArray = cardArray;
  };
  addCard(card) {

    this.cardArray.push(card);
    this.render();
  };
  render() {
    this.cardArray.forEach((card) => {
      const cardDom = card.create();
      this.container.appendChild(cardDom);
    })
  }
}


class Popup {
  constructor(popupElement) {
    this.popupBlock = popupElement;
    this.popupBlock.querySelector('.popup__close').addEventListener('click', (event) => this.close());
  }

  close() {
    this.popupBlock.classList.remove('popup_is-opened');
  }
}


class PopupProfile extends Popup {
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


class PopupCard extends Popup {
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


class ImagePopup extends Popup {
  constructor(imageBlock) {
    super(imageBlock);

  }
  open(imageSrc) {
    this.popupBlock.classList.add('popup_is-opened');
    const imagePop = document.querySelector('.popup__image');
    imagePop.src = imageSrc;
  }
}


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


class User {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }
}


const cards = document.querySelector('.places-list');

const usernameField = document.querySelector('.user-info__name');
const jobField = document.querySelector('.user-info__job');

const profileBlock = document.querySelector('.popup_edit-profile');
const newProfile = new PopupProfile(profileBlock);
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

const newCard = new PopupCard(newCardBlock);
const newCardButton = document.querySelector('.user-info__button');
newCardButton.addEventListener('click', (event) => {
  newCard.open();
})

const cardSubmitButton = document.querySelector('.popup__button_card');
const addCardForm = document.querySelector('.popup__form_card');
addCardForm.addEventListener('submit', (event) => {
  Loading(true, cardSubmitButton);
  event.preventDefault();
  const makeCard = newCard.add();
  Loading(false, cardSubmitButton);
  newCard.close();
});

const imagePop = new ImagePopup(document.querySelector('.popup_image'));

const userPhoto = document.querySelector('.user-info__photo');


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

  getResponseJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}


const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort5',
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
    const cardList = new CardList(cards, cardsArray);
    cardList.render();
  });
