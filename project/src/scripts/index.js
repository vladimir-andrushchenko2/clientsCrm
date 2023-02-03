import constants from './constants';
import Popup from './components/popup';
import TableApp from './components/table';
import UserForm from './components/userForm';
import api from './api';
import clientsState from './state/clientsState';
import { fillForm } from './elementHandlers/fillForm';
import onSubmitWrapper from './wrappers/onSubmitWrapper';
import InputWrapper from './components/searchBar';

const editUserPopUp = new Popup({
  popUp: constants.editClientPopUp,
  ...constants,
});

const deleteUserPopUp = new Popup({
  popUp: constants.deleteClientPopup,
  ...constants,
});

const table = new TableApp({
  tableElement: constants.clientsTable,
  onEditAction(clientId) {
    // select to check that client is in state
    clientsState.selectClient(clientId);

    constants.editClientSubtitle.textContent = `ID: ${clientId}`;

    api.getClient(clientId)
      .then((clientData) => {
        clientsState.updateSelectedClient(clientData);
        editUserPopUp.open();

        fillForm({
          form: constants.editClientForm,
          ...clientsState.getSelectedClient(),
          selectors: constants,
        });

        editUserPopUp.updateAddContactButton();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  onDeleteAction(clientId) {
    clientsState.selectClient(clientId);
    deleteUserPopUp.open();
  },
  ...constants,
});

const searchBar = new InputWrapper({
  inputElement: constants.searchBarInputElement,
  onInput(value) {
    api.getClients(value)
      .then((res) => {
        clientsState.setClients(res);
        table.syncWithState();
        table.render();
      });
  },
});

const deleteUserForm = new UserForm({
  formElement: constants.deleteClientForm,
  onSubmit() {
    const { id } = clientsState.getSelectedClient();
    const apiCallPromise = api.deleteClient(id);

    onSubmitWrapper({
      popUp: deleteUserPopUp,
      form: deleteUserForm,
      table,
      apiCallResult: apiCallPromise,
    });
  },
  ...constants,
});

const editUserForm = new UserForm({
  formElement: constants.editClientForm,
  onSubmit(formData) {
    const { id } = clientsState.getSelectedClient();
    const apiCallPromise = api.patchClient(id, formData);

    onSubmitWrapper({
      popUp: editUserPopUp,
      form: editUserForm,
      table,
      apiCallResult: apiCallPromise,
    });
  },
  onSecondaryAction() {
    fillForm({
      form: constants.addClientForm,
      name: '',
      surname: '',
      lastName: '',
      contacts: [],
      selectors: constants,
    });
    editUserPopUp.close();
    deleteUserPopUp.open();
  },
  ...constants,
});

const addUserPopUp = new Popup({
  popUp: constants.addClientPopUp,
  ...constants,
});

constants.addClientButton.addEventListener('click', () => {
  addUserPopUp.open();
});

const addUserForm = new UserForm({
  formElement: constants.addClientForm,
  onSubmit(formData) {
    onSubmitWrapper({
      popUp: addUserPopUp,
      table,
      form: addUserForm,
      apiCallResult: api.postClient(formData),
    });
  },
  onSecondaryAction() {
    fillForm({
      form: constants.addClientForm,
      name: '',
      surname: '',
      lastName: '',
      contacts: [],
      selectors: constants,
    });

    addUserPopUp.close();
  },
  ...constants,
});

api.getClients()
  .then((clients) => {
    clientsState.setClients(clients);

    table.init();
  })
  .catch((err) => console.log(err));
