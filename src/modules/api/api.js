export class Api {
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
  