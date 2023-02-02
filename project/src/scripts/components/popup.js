import { createContactField } from '../elementGenerators';
import { fillContact } from '../elementHandlers/fillForm';
import constants from '../constants';

function toggleContactOptionsMenuVisibility(contactElement) {
  const contactOptionMenu = contactElement.querySelector(constants.contactOptionsMenuSelector);
  contactOptionMenu.classList.toggle(constants.contactOptionsMenuVisibleClass);
}

export default class Popup {
  constructor({
    popUp,
    closeButtonSelector,
    popupOpenedClass,
    contactsContainerSelector,
    addContactButtonSelector,
    openContactOptionsBtnClass,
    userErrorDisplaySelector,
    userErrorDisplayOpenedClass,
    loadIndicatorSelectorAndVisibleClass: [loadIndicatorSelector, loadIndicatoVisibleClass],
    contactElementSelector,
    contactOptionButtonClass,
    contactOptionsMenuVisibleClass,
    contactOptionsMenuSelector,
    contactDeleteButtonClass,
  }) {
    this.popUp = popUp;

    this.closeButton = this.popUp.querySelector(closeButtonSelector);
    this.popupOpenedClass = popupOpenedClass;

    this.contactsContainer = this.popUp.querySelector(contactsContainerSelector);
    this.addContactButton = this.popUp.querySelector(addContactButtonSelector);

    this._errorDisplay = this.popUp.querySelector(userErrorDisplaySelector);
    this._errorDisplayOpenedClass = userErrorDisplayOpenedClass;

    this._loadIndicator = this.popUp.querySelector(loadIndicatorSelector);
    this._loadIndicatorVisibleClass = loadIndicatoVisibleClass;

    this._openContactOptionsBtnClass = openContactOptionsBtnClass;

    this._contactElementSelector = contactElementSelector;
    this._contactOptionButtonClass = contactOptionButtonClass;

    this._contactOptionsMenuVisibleClass = contactOptionsMenuVisibleClass;
    this._contactOptionsMenuSelector = contactOptionsMenuSelector;

    this._contactDeleteButtonClass = contactDeleteButtonClass;

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

  setCloseBtnEventListener() {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  setAddContactEventListener() {
    this.addContactButton.addEventListener('click', () => {
      this.contactsContainer.append(createContactField());
    });
  }

  setContactTypeSelectEventListener() {
    this.contactsContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this._openContactOptionsBtnClass)) {
        const contactElement = target.closest(this._contactElementSelector);
        toggleContactOptionsMenuVisibility(contactElement);
      }
    });
  }

  setChangeContactTypeEventListener() {
    this.contactsContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this._contactOptionButtonClass)) {
        const type = target.dataset.contactType;

        const contactElement = target.closest(this._contactElementSelector);

        fillContact({
          contactElement,
          type,
          value: '',
          ...constants,
        });

        toggleContactOptionsMenuVisibility(contactElement);
      }
    });
  }

  setDeleteContactEventListener() {
    this.contactsContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this._contactDeleteButtonClass)) {
        const contactElement = target.closest(this._contactElementSelector);

        contactElement.remove();
      }
    });
  }

  setEventListeners() {
    this.setCloseBtnEventListener();

    if (this.addContactButton) {
      this.setAddContactEventListener();
      this.setContactTypeSelectEventListener();
    }

    if (this.contactsContainer) {
      this.setChangeContactTypeEventListener();
      this.setDeleteContactEventListener();
    }
  }
}
