// import clients from './data/clients';
import { clientsTable, tableHead } from './constants';
import { createClientRowElement } from './elementGenerators';
import ClientsState from './state/clientsState';
import api from './api';

class App {
  constructor(tableElement, sortControls) {
    this.table = tableElement;
    this.sortControls = sortControls;
  }

  setSortControlsEventListeners() {
    this.sortControls.addEventListener('click', ({ target }) => {
      if (target.classList.contains('table__control')) {
        const { sortMethodName } = target.dataset;
        const studentInterface = this.state.getClientsInterface();
        this.clients = studentInterface[sortMethodName]().data();
        this.render();
      }
    });
  }

  setEventListeners() {
    this.setSortControlsEventListeners();
  }

  fetchData() {
    return api.getClients()
      .then((clients) => {
        this.state = new ClientsState(clients);
        this.clients = this.state.getClientsInterface().data();
      });
  }

  render() {
    this.table.innerHTML = '';
    this.table.append(...this.clients.map(createClientRowElement));
  }

  init() {
    return this.fetchData().then(() => {
      this.setEventListeners();
      this.render();
    });
  }
}

const app = new App(clientsTable, tableHead);
app.init();
