export default class Popup {
  constructor({
    popUp,
    closeButtonSelector,
    popupOpenedClass,
    contactsContainerSelector,
    addContactButtonSelector,
    contactInputTemplate,
    openContactOptionsBtnClass,
  }) {
    this.popUp = popUp;

    this.closeButton = this.popUp.querySelector(closeButtonSelector);
    this.popupOpenedClass = popupOpenedClass;

    this.contactsContainer = this.popUp.querySelector(contactsContainerSelector);
    this.addContactButton = this.popUp.querySelector(addContactButtonSelector);
    this.contactInputTemplate = contactInputTemplate;

    this.openContactOptionsBtnClass = openContactOptionsBtnClass;

    this.setEventListeners();
  }

  close() {
    this.popUp.classList.remove(this.popupOpenedClass);
  }

  open() {
    this.popUp.classList.add(this.popupOpenedClass);
  }

  makeContactField() {
    return this.contactInputTemplate.content.cloneNode(true);
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });

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
