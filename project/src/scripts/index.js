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
  userErrorDisplaySelector,
  userErrorDisplayOpenedClass,
  loadIndicatorSelectorAndVisibleClass,
} from './constants';
import Popup from './components/popup';
import TableApp from './components/table';
import UserForm from './components/userForm';
import api from './api';
import clientsState from './state/clientsState';

// use set state to add state to table and it will keep ref to it
// as it stored as ref it renders current state
const table = new TableApp({
  tableElement: clientsTable,
  sortControls: tableHead,
  sortControlSelector: 'table__control',
});

const addUserPopUp = new Popup({
  popUp: addClientPopUp,
  closeButtonSelector: closePopUpButtonSelector,
  popupOpenedClass,
  contactsContainerSelector,
  addContactButtonSelector,
  contactInputTemplate,
  openContactOptionsBtnClass,
  userErrorDisplaySelector,
  userErrorDisplayOpenedClass,
  loadIndicatorSelectorAndVisibleClass,
});

addClientButton.addEventListener('click', () => {
  addUserPopUp.open();
});

const userForm = new UserForm({
  formElement: addClientForm,
  userInfoInputSelector,
  userContactsInputSelector,
  onSubmit(formData) {
    addUserPopUp.hideError();
    addUserPopUp.indicateLoading();

    return api.postClient(formData)
      .then(() => api.getClients())
      .then((clients) => {
        clientsState.setClients(clients);
        table.render();

        addUserPopUp.close();
        addClientForm.reset();
      })
      .catch((error) => {
        const errorMsg = error.errors.map(({ message }) => message).join('\n');
        addUserPopUp.displayError(errorMsg);
      })
      .finally(() => {
        addUserPopUp.stopLoadingIndication();
      });
  },
});

api.getClients()
  .then((clients) => {
    clientsState.setClients(clients);

    // for testing
    clientsState.selectClient(clients[0].id);

    table.init(clientsState);
  })
  .catch((err) => console.log(err));
