import { createClientRowElement } from '../elementGenerators';

// tableElements is there created rows will be appended to
// sortConrols is some parent element that has buttons with class sortControlSelector
// sort button have (data-sort-method-name="sortedById")
// data-attribute with the name of sorting method
// which will be called on click
export default class TableApp {
  constructor({
    tableElement, sortControls, sortControlSelector,
  }) {
    this.table = tableElement;
    this.sortControls = sortControls;
    this.sortControlSelector = sortControlSelector;
  }

  setSortControlsEventListeners() {
    this.sortControls.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.sortControlSelector)) {
        const { sortMethodName } = target.dataset;
        this.currentSortMethodName = sortMethodName;
        this.render();
      }
    });
  }

  setEventListeners() {
    this.setSortControlsEventListeners();
  }

  setState(state) {
    this.state = state;
  }

  render() {
    this.table.innerHTML = '';

    const displayedClients = this.currentSortMethodName
      ? this.state.getClientsSortedBy(this.currentSortMethodName)
      : this.state.getClients();

    this.table.append(...displayedClients.map(createClientRowElement));
  }

  init(state) {
    this.setState(state);
    this.setEventListeners();
    this.render();
  }
}
