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
import api from './api';
import ClientsState from './state/clientsState';

const clientsState = new ClientsState();

// use set state to add state to table and it will keep ref to it
// as it stored as ref it renders current state
const table = new TableApp({
  tableElement: clientsTable,
  sortControls: tableHead,
  sortControlSelector: 'table__control',
});

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
  onSubmit(formData) {
    api.postClient(formData)
      .then(() => api.getClients())
      .then((clients) => {
        clientsState.setClients(clients);
        table.render();
        addUserPopUp.close();
      })
      .catch((err) => console.log(err));
  },
});

api.getClients()
  .then((clients) => {
    clientsState.setClients(clients);
    table.init(clientsState);
  })
  .catch((err) => console.log(err));
