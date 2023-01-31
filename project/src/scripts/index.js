import TableApp from './components/table';
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
} from './constants';
import Popup from './components/popup';

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

const table = new TableApp({ tableElement: clientsTable, sortControls: tableHead, sortControlSelector: 'table__control' });
table.init();
