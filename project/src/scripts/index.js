import constants from './constants';
import Popup from './components/popup';
import TableApp from './components/table';
import UserForm from './components/userForm';
import api from './api';
import clientsState from './state/clientsState';

const editUserPopUp = new Popup({
  popUp: constants.editClientPopUp,
  closeButtonSelector: constants.closePopUpButtonSelector,
  ...constants,
});

const table = new TableApp({
  tableElement: constants.clientsTable,
  onEditAction(clientId) {
    clientsState.selectClient(clientId);
    constants.editClientSubtitle.textContent = `ID: ${clientId}`;
    editUserPopUp.open();
  },
  onDeleteAction(clientId) {
    console.log('Delete Action', clientId);
  },
  ...constants,
});

const addUserPopUp = new Popup({
  popUp: constants.addClientPopUp,
  closeButtonSelector: constants.closePopUpButtonSelector,
  ...constants,
});

constants.addClientButton.addEventListener('click', () => {
  addUserPopUp.open();
});

const addUserForm = new UserForm({
  formElement: constants.addClientForm,
  onSubmit(formData) {
    addUserPopUp.hideError();
    addUserPopUp.indicateLoading();

    return api.postClient(formData)
      .then(() => api.getClients())
      .then((clients) => {
        clientsState.setClients(clients);
        table.render();

        addUserPopUp.close();
        constants.addClientForm.reset();
      })
      .catch((error) => {
        const errorMsg = error.errors.map(({ message }) => message).join('\n');
        addUserPopUp.displayError(errorMsg);
      })
      .finally(() => {
        addUserPopUp.stopLoadingIndication();
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
