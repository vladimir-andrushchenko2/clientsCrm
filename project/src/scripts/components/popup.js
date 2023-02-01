export default class Popup {
  constructor({
    popUp,
    closeButtonSelector,
    popupOpenedClass,
    contactsContainerSelector,
    addContactButtonSelector,
    contactInputTemplate,
    openContactOptionsBtnClass,
    userErrorDisplaySelector,
    userErrorDisplayOpenedClass,
    loadIndicatorSelectorAndVisibleClass: [loadIndicatorSelector, loadIndicatoVisibleClass],
  }) {
    this.popUp = popUp;

    this.closeButton = this.popUp.querySelector(closeButtonSelector);
    this.popupOpenedClass = popupOpenedClass;

    this.contactsContainer = this.popUp.querySelector(contactsContainerSelector);
    this.addContactButton = this.popUp.querySelector(addContactButtonSelector);
    this.contactInputTemplate = contactInputTemplate;

    this._errorDisplay = document.querySelector(userErrorDisplaySelector);
    this._errorDisplayOpenedClass = userErrorDisplayOpenedClass;

    this._loadIndicator = this.popUp.querySelector(loadIndicatorSelector);
    this._loadIndicatorVisibleClass = loadIndicatoVisibleClass;

    this.openContactOptionsBtnClass = openContactOptionsBtnClass;

    this.setEventListeners();
  }

  close() {
    this.popUp.classList.remove(this.popupOpenedClass);
  }

  open() {
    this.popUp.classList.add(this.popupOpenedClass);
  }

  clearContactFields() {
    this.contactsContainer.innerHTML = '';
  }

  displayError(errorText) {
    this._errorDisplay.classList.add(this._errorDisplayOpenedClass);

    this._errorDisplay.textContent = errorText;
  }

  hideError() {
    this._errorDisplay.classList.remove(this._errorDisplayOpenedClass);
  }

  indicateLoading() {
    this._loadIndicator.classList.add(this._loadIndicatorVisibleClass);
  }

  stopLoadingIndication() {
    this._loadIndicator.classList.remove(this._loadIndicatorVisibleClass);
  }

  makeContactField() {
    return this.contactInputTemplate.content.cloneNode(true);
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    if (this.addContactButton && this.addContactButtonSelector) {
      this.addContactButton.addEventListener('click', () => {
        this.contactsContainer.append(this.makeContactField());
      });

      this.contactsContainer.addEventListener('click', ({ target }) => {
        if (target.classList.contains(this.openContactOptionsBtnClass)) {
          const parent = target.closest('.contact__item');
          const contactOptionMenu = parent.querySelector('.contact__options');
          contactOptionMenu.classList.toggle('contact__options_visible');
        }
      });
    }
  }
}
