import {
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
} from './constants';
import Popup from './components/popup';
import TableApp from './components/table';
import UserForm from './components/userForm';

const addUserPopUp = new Popup({
  openButton: addClientButton,
  popUp: addClientPopUp,
  closeButtonSelector: closePopUpButtonSelector,
  popupOpenedClass,
  contactsContainerSelector,
  addContactButtonSelector,
  contactInputTemplate,
  openContactOptionsBtnClass,
});

const userForm = new UserForm({
  formElement: addClientForm,
  userInfoInputSelector,
  userContactsInputSelector,
  onSubmit(obj) {
    console.log(obj);
  },
});

const table = new TableApp({ tableElement: clientsTable, sortControls: tableHead, sortControlSelector: 'table__control' });
table.init();
