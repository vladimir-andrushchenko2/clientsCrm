// import clients from './data/clients';
import TableApp from './components/table';
import {
  clientsTable,
  tableHead,
  addClientButton,
  addClientPopUp,
  closePopUpButtonSelector,
  popupOpenedClass,
} from './constants';
import Popup from './components/popup';

const addUserPopUp = new Popup({
  openButton: addClientButton,
  popUp: addClientPopUp,
  closeButtonSelector: closePopUpButtonSelector,
  popupOpenedClass,
});

const table = new TableApp({ tableElement: clientsTable, sortControls: tableHead, sortControlSelector: 'table__control' });
table.init();
