import { getFullName, copyShallow } from '../utils';

function sortedByName(clients) {
  return copyShallow(clients).sort((left, right) => {
    const fullNameLeft = getFullName(left);
    const fullNameRight = getFullName(right);

    return fullNameLeft > fullNameRight ? 1 : -1;
  });
}

function sortedById(clients) {
  return copyShallow(clients).sort((left, right) => Number(left.id) - Number(right.id));
}

function sortedDateProperty(property, clients) {
  return copyShallow(clients).sort((left, right) => {
    const timeLeft = new Date(left[property]);
    const timeRight = new Date(right[property]);

    return timeLeft - timeRight;
  });
}

function sortedByCreatedAt(clients) {
  return sortedDateProperty('createdAt', clients);
}

function sortedByUpdatedAt(clients) {
  return sortedDateProperty('updatedAt', clients);
}

const modifiers = {
  sortedById,
  sortedByName,
  sortedByCreatedAt,
  sortedByUpdatedAt,
};

class ClientsState {
  setClients(clients) {
    this._clients = clients;
  }

  getClients() {
    return copyShallow(this._clients);
  }

  selectClient(id) {
    if (!this._clients) {
      throw new Error('clients havent been set, use setClients');
    }

    const selectedClient = this._clients.find((client) => client.id === id);

    if (!selectedClient) {
      throw new Error(`client with id: ${id} is doesnt exist in state`);
    }

    this._seletedClient = selectedClient;
  }

  updateSelectedClient(updatedClient) {
    if (!this._clients) {
      throw new Error('clients havent been set, use setClients');
    }

    if (!this._seletedClient) {
      throw new Error('no selected student, when calling clientsState.getSelectedClient();');
    }

    if (updatedClient.id !== this._seletedClient.id) {
      throw new Error('updatedClient.id !== this._seletedClient.id, in updateSelectedClient(updatedClient)');
    }

    Object.entries(updatedClient).forEach(([key, value]) => {
      this._seletedClient[key] = value;
    });
  }

  getSelectedClient() {
    if (!this._seletedClient) {
      throw new Error('no selected student, when calling clientsState.getSelectedClient();');
    }

    return this._seletedClient;
  }

  getClientsSortedBy(sortingMethod) {
    return modifiers[sortingMethod](this._clients);
  }

  addClient(client) {
    this._clients.push(client);
  }
}

const clientsState = new ClientsState();

export default clientsState;
