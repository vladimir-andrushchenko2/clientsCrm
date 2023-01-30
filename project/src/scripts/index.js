/* eslint-disable quote-props */
import clients from './data/clients';
import { clientsTable } from './constants';
import { createClientRowElement } from './elementGenerators';

class App {
  constructor(table) {
    this.table = table;
  }

  setEventListeners() {

  }

  getData() {

  }

  init() {
    this.table.append(...clients.map(createClientRowElement));
  }
}

const app = new App(clientsTable);
app.init();
