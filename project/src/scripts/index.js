import constants from './constants';
import Popup from './components/popup';
import TableApp from './components/table';
import UserForm from './components/userForm';
import api from './api';
import clientsState from './state/clientsState';
import { fillForm } from './elementHandlers/fillForm';
import onSubmitWrapper from './wrappers/onSubmitWrapper';

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
    clientsState.selectClient(clientId);

    constants.editClientSubtitle.textContent = `ID: ${clientId}`;

    editUserPopUp.open();

    fillForm({
      form: constants.editClientForm,
      ...clientsState.getSelectedClient(),
      selectors: constants,
    });
  },
  onDeleteAction(clientId) {
    clientsState.selectClient(clientId);
    deleteUserPopUp.open();
  },
  ...constants,
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
  ...constants,
});

api.getClients()
  .then((clients) => {
    clientsState.setClients(clients);

    // for testing
    clientsState.selectClient(clients[0].id);

    table.init(clientsState);
  })
  .catch((err) => console.log(err));
