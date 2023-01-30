export default class Popup {
  constructor({
    openButton,
    popUp,
    closeButtonSelector,
    popupOpenedClass,
  }) {
    this.openButton = openButton;
    this.popUp = popUp;
    this.closeButtonSelector = closeButtonSelector;
    this.popupOpenedClass = popupOpenedClass;

    this.setEventListeners();
  }

  setEventListeners() {
    this.openButton.addEventListener('click', () => {
      this.popUp.classList.add(this.popupOpenedClass);
    });

    this.popUp.querySelector(this.closeButtonSelector).addEventListener('click', () => {
      this.popUp.classList.remove(this.popupOpenedClass);
    });
  }
}
