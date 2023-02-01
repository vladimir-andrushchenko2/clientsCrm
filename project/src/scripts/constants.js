const clientRowTemplate = document.querySelector('#contact-table-row');
const clientContactTooltipTemplate = document.querySelector('#contact-tooltip');
const clientsTable = document.querySelector('.table-clients-container');
const tableHead = document.querySelector('.table__head');

const addClientButton = document.querySelector('.add-client-btn');
const addClientPopUp = document.querySelector('.popup_add-user');

const closePopUpButtonSelector = '.popup__close-btn';
const popupOpenedClass = 'popup_opened';

const contactsContainerSelector = '.contacts';
const addContactButtonSelector = '.form__add-contact-btn';
const contactInputTemplate = document.querySelector('#contact-form-field');
const openContactOptionsBtnClass = 'contact__open-options-btn';

const addClientForm = document.querySelector('.popup_add-user');

const userInfoInputSelector = '.popup__input';
const userContactsInputSelector = '.contact__input';

const userErrorDisplaySelector = '.popup__error-display';
const userErrorDisplayOpenedClass = 'popup__error-display_opened';

const loadIndicatorSelectorAndVisibleClass = ['.submit-loading-indicator', 'submit-loading-indicator_visible'];

export {
  clientRowTemplate,
  clientContactTooltipTemplate,
  clientsTable,
  tableHead,
  addClientButton,
  addClientPopUp,
  closePopUpButtonSelector,
  popupOpenedClass,
  contactsContainerSelector,
  addContactButtonSelector,
  contactInputTemplate,
  openContactOptionsBtnClass,
  addClientForm,
  userInfoInputSelector,
  userContactsInputSelector,
  userErrorDisplaySelector,
  userErrorDisplayOpenedClass,
  loadIndicatorSelectorAndVisibleClass,
};
