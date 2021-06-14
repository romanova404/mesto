import {ImagePopup} from '../../__image/image-popup.js';
const imagePop = new ImagePopup(document.querySelector('.popup_image'));
export class Card {
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