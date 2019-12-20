export class ElementValidator {
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