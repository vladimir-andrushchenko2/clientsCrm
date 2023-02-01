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
  editClientPopUp,
  editClientForm,
  clientEditBtnClass,
  clientDeleteBtnClass,
  sortControlSelector,
  editClientSubtitle,
} from './constants';
import Popup from './components/popup';
import TableApp from './components/table';
import UserForm from './components/userForm';
import api from './api';
import clientsState from './state/clientsState';

const editUserPopUp = new Popup({
  popUp: editClientPopUp,
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

const table = new TableApp({
  tableElement: clientsTable,
  tableHead,
  sortControlSelector,
  clientEditBtnClass,
  clientDeleteBtnClass,
  onEditAction(clientId) {
    clientsState.selectClient(clientId);
    editClientSubtitle.textContent = `ID: ${clientId}`;
    editUserPopUp.open();
  },
  onDeleteAction(clientId) {
    console.log('Delete Action', clientId);
  },
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

const addUserForm = new UserForm({
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
