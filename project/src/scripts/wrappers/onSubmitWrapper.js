import api from '../api';
import clientsState from '../state/clientsState';

function onSubmitWrapper({
  popUp, form, table, apiCallResult,
}) {
  popUp.hideError();
  popUp.indicateLoading();

  return apiCallResult
    .then(() => api.getClients())
    .then((clients) => {
      clientsState.setClients(clients);

      table.syncWithState();
      table.render();

      popUp.close();

      form.reset();
    })
    .catch((error) => {
      console.error(error);
      const errorMsg = error.errors.map(({ message }) => message).join('\n');
      popUp.displayError(errorMsg);
    })
    .finally(() => {
      popUp.stopLoadingIndication();
    });
}

export default onSubmitWrapper;
