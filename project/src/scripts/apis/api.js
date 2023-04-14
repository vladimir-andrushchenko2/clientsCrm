import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

/*
this api for local storage is a placeholder for proper backend
*/

function getNewId() {
  return uuidv4().substring(0, 8);
}

const stateKey = 'state';

function getStoredClients() {
  return JSON.parse(localStorage.getItem(stateKey));
}

function rewriteStoredClients(newClientsState) {
  return localStorage.setItem(stateKey, JSON.stringify(newClientsState));
}

function wrapInPromise(value) {
  return new Promise((resolve) => {
    resolve(value);
  });
}

function getClients(searchQuery) {
  const clients = getStoredClients();

  if (searchQuery) {
    const filtered = clients
      .filter((client) => [client.name, client.surname, client.lastName].join('').includes(searchQuery));

    return wrapInPromise(filtered);
  }

  return wrapInPromise(clients);
}

function getClient(clientId) {
  const outputClient = getStoredClients().find((client) => client.id === clientId);

  return wrapInPromise(outputClient);
}

function postClient({
  name, surname, lastName, contacts,
}) {
  const clients = getStoredClients();

  clients.push({
    id: getNewId(),
    name,
    surname,
    lastName,
    contacts,
    createdAt: (new Date()).toJSON(),
    updatedAt: (new Date()).toJSON(),
  });

  rewriteStoredClients(clients);

  return wrapInPromise(null);
}

function patchClient(clientId, {
  name, surname, lastName, contacts,
}) {
  const newState = produce(getStoredClients(), (draft) => {
    const clientRef = draft.find((client) => client.id === clientId);

    Object.assign(clientRef, {
      name, surname, lastName, contacts, updatedAt: (new Date()).toJSON(),
    });
  });

  rewriteStoredClients(newState);

  return wrapInPromise(null);
}

function deleteClient(clientId) {
  const newState = getStoredClients().filter((client) => client.id !== clientId);

  rewriteStoredClients(newState);

  return wrapInPromise(null);
}

const localHostApi = {
  getClients,
  getClient,
  postClient,
  patchClient,
  deleteClient,
};

function initLocalStorage() {
  if (!localStorage.getItem(stateKey)) {
    console.log('initialized local storage');
    // initialize with empty array
    rewriteStoredClients([]);
    postClient({
      name: 'Volodymyr',
      surname: 'Andrushchenko',
      lastName: '',
      contacts: [
        {
          type: 'tel',
          value: '+97855123454',
        },
        {
          type: 'email',
          value: 'andrushchenko.vladimir@gmail.com',
        },
        {
          type: 'other',
          value: 'https://github.com/vladimir-andrushchenko2',
        },
      ],
    });
  }
}

initLocalStorage();

export default localHostApi;
