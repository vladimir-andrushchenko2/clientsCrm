import { createClientRowElement } from '../elementGenerators';
import ClientsState from '../state/clientsState';
import api from '../api';

// tableElements is there created rows will be appended to
// sortConrols is some parent element that has buttons with class sortControlSelector
// sort button have (data-sort-method-name="sortedById")
// data-attribute with the name of sorting method
// which will be called on click
export default class TableApp {
  constructor({ tableElement, sortControls, sortControlSelector }) {
    this.table = tableElement;
    this.sortControls = sortControls;
    this.sortControlSelector = sortControlSelector;
  }

  setSortControlsEventListeners() {
    this.sortControls.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.sortControlSelector)) {
        const { sortMethodName } = target.dataset;
        this.clients = this.state.getSortedBy(sortMethodName);
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
        this.clients = this.state.getClients();
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
