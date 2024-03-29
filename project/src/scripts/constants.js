const clientRowTemplate = document.querySelector('#contact-table-row');
const clientContactTooltipTemplate = document.querySelector('#contact-tooltip');
const clientsTable = document.querySelector('.table-clients-container');
const tableHead = document.querySelector('.table__head');

const sortControlClass = 'table__control';
const sortControlActiveClass = 'table__control_active';
const sortControlReversedClass = 'table__control_reversed';

const clientEditBtnClass = 'client-edit-btn';
const clientDeleteBtnClass = 'client-delete-btn';

const addClientButton = document.querySelector('.add-client-btn');
const addClientPopUp = document.querySelector('.popup_add-user');

const editClientPopUp = document.querySelector('.popup_edit-user');
const editClientSubtitle = editClientPopUp.querySelector('.popup__subtitle');

const closeButtonSelector = '.popup__close-btn';
const popupOpenedClass = 'popup_opened';

const contactsContainerSelector = '.contacts';
const addContactButtonSelector = '.form__add-contact-btn';
const contactInputTemplate = document.querySelector('#contact-form-field');

const openContactOptionsBtnClass = 'contact__open-options-btn';
const contactOptionButtonClass = 'contact__option';
const contactElementSelector = '.contact__item';
const contactOptionsMenuSelector = '.contact__options';
const contactOptionsMenuVisibleClass = 'contact__options_visible';
const contactDeleteButtonClass = 'contact__clear-btn';

const addClientForm = document.querySelector('.form-add-client');
const editClientForm = document.querySelector('.form-edit-user');

const userInfoInputSelector = '.popup__input';
const userContactsInputSelector = '.contact__input';

const userErrorDisplaySelector = '.popup__error-display';
const userErrorDisplayOpenedClass = 'popup__error-display_opened';

const loadIndicatorSelectorAndVisibleClass = ['.submit-loading-indicator', 'submit-loading-indicator_visible'];

const deleteClientPopup = document.querySelector('.popup_delete-user');
const deleteClientForm = document.querySelector('.form-delete-client');

const currentContactTypeDisplaySelector = '.current-contact-option-identificator';

const tooltipBtnClass = 'contact-show-tooltip-btn';
const tooltipWrapperSelector = '.tooltip-wrapper';
const tooltipWrapperOpenedClass = 'contact_open';

const searchBarInputElement = document.querySelector('.header__search');

const formSecondaryActionBtnSelector = '.form__secondary-action-btn';

const contactTypeToStringMap = {
  facebook: 'Facebook',
  email: 'Email',
  other: 'Other',
  tel: 'Phone',
  vk: 'Vk',
};

const constantsContainer = Object.freeze({
  formSecondaryActionBtnSelector,
  searchBarInputElement,
  sortControlReversedClass,
  sortControlActiveClass,
  contactDeleteButtonClass,
  contactOptionsMenuVisibleClass,
  contactOptionsMenuSelector,
  contactElementSelector,
  contactOptionButtonClass,
  tooltipBtnClass,
  tooltipWrapperSelector,
  tooltipWrapperOpenedClass,
  contactTypeToStringMap,
  currentContactTypeDisplaySelector,
  clientRowTemplate,
  clientContactTooltipTemplate,
  clientsTable,
  tableHead,
  addClientButton,
  addClientPopUp,
  closeButtonSelector,
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
  editClientPopUp,
  editClientForm,
  clientEditBtnClass,
  clientDeleteBtnClass,
  sortControlClass,
  editClientSubtitle,
  deleteClientPopup,
  deleteClientForm,
});

export default constantsContainer;
