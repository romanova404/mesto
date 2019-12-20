import "./style.css";

import {PopupProfile} from './modules/popup/__profile/popup-profile.js';
import {PopupCard} from './modules/popup/__card/popup-card.js';
import {Api} from './modules/api/api.js';
import {CardList} from './modules/cardlist/card-list.js';

import {User} from './modules/popup/__profile/__user/user.js';
import {Card} from './modules/popup/__card/__newcard/card.js';



const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';

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
