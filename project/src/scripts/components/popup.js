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
    this._popUp = popUp;

    this._closeButton = this._popUp.querySelector(closeButtonSelector);
    this._popupOpenedClass = popupOpenedClass;

    this._contactsContainer = this._popUp.querySelector(contactsContainerSelector);
    this._addContactButton = this._popUp.querySelector(addContactButtonSelector);

    this._errorDisplay = this._popUp.querySelector(userErrorDisplaySelector);
    this._errorDisplayOpenedClass = userErrorDisplayOpenedClass;

    this._loadIndicator = this._popUp.querySelector(loadIndicatorSelector);
    this._loadIndicatorVisibleClass = loadIndicatoVisibleClass;

    this._openContactOptionsBtnClass = openContactOptionsBtnClass;

    this._contactElementSelector = contactElementSelector;
    this._contactOptionButtonClass = contactOptionButtonClass;

    this._contactOptionsMenuVisibleClass = contactOptionsMenuVisibleClass;
    this._contactOptionsMenuSelector = contactOptionsMenuSelector;

    this._contactDeleteButtonClass = contactDeleteButtonClass;

    this.addContactToContactsContainer = this.addContactToContactsContainerHandler.bind(this);

    this.setEventListeners();
  }

  close() {
    this._popUp.classList.remove(this._popupOpenedClass);
  }

  open() {
    this._popUp.classList.add(this._popupOpenedClass);
  }

  clearContactFields() {
    this._contactsContainer.innerHTML = '';
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

  updateAddContactButton() {
    const contacts = this._contactsContainer.querySelectorAll(this._contactElementSelector);

    if (!this._popUp.querySelector(this._addContactButtonSelector)
      && contacts.length <= 4) {
      this._contactsContainer.after(this._addContactButton);
    }

    if (contacts.length > 4) {
      this._addContactButton.remove();
    }
  }

  addContactToContactsContainerHandler() {
    if (!this._contactsContainer) {
      throw new Error('No contacts container to add to');
    }

    this._contactsContainer.append(createContactField());

    this.updateAddContactButton();
  }

  setCloseBtnEventListener() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  setAddContactEventListener() {
    this._addContactButton.addEventListener('click', this.addContactToContactsContainer);
  }

  setContactTypeSelectEventListener() {
    this._contactsContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this._openContactOptionsBtnClass)) {
        const contactElement = target.closest(this._contactElementSelector);
        toggleContactOptionsMenuVisibility(contactElement);
      }
    });
  }

  setChangeContactTypeEventListener() {
    this._contactsContainer.addEventListener('click', ({ target }) => {
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
    this._contactsContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this._contactDeleteButtonClass)) {
        const contactElement = target.closest(this._contactElementSelector);

        contactElement.remove();

        this.updateAddContactButton();
      }
    });
  }

  setEventListeners() {
    this.setCloseBtnEventListener();

    if (this._addContactButton) {
      this.setAddContactEventListener();
    }

    if (this._contactsContainer) {
      this.setContactTypeSelectEventListener();
      this.setChangeContactTypeEventListener();
      this.setDeleteContactEventListener();
    }
  }
}
