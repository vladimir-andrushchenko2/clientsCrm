import ClientsInterface from './clientsInterface';

class ClientsState {
  constructor(clients) {
    this._clients = clients;
  }

  getStudentsInterface() {
    return new ClientsInterface(this._clients.slice());
  }

  addClient(client) {
    this._clients.push(client);
  }
}

export default ClientsState;
