import { createClientRowElement } from '../elementGenerators';

// tableElements is there created rows will be appended to
// sortConrols is some parent element that has buttons with class sortControlSelector
// sort button have (data-sort-method-name="sortedById")
// data-attribute with the name of sorting method
// which will be called on click
export default class TableApp {
  constructor({
    tableElement,
    tableHead,
    sortControlSelector,
    onEditAction,
    onDeleteAction,
    clientEditBtnClass,
    clientDeleteBtnClass,
    tooltipBtnClass,
    tooltipWrapperSelector,
    tooltipWrapperOpenedClass,
  }) {
    this.table = tableElement;
    this.tableHead = tableHead;
    this.sortControlSelector = sortControlSelector;
    this.onEditAction = onEditAction;
    this.onDeleteAction = onDeleteAction;
    this.clientEditBtnClass = clientEditBtnClass;
    this.clientDeleteBtnClass = clientDeleteBtnClass;
    this.tooltipBtnClass = tooltipBtnClass;
    this.tooltipWrapperSelector = tooltipWrapperSelector;
    this.tooltipWrapperOpenedClass = tooltipWrapperOpenedClass;
  }

  setSortControlsEventListeners() {
    this.tableHead.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.sortControlSelector)) {
        const { sortMethodName } = target.dataset;
        this.currentSortMethodName = sortMethodName;
        this.render();
      }
    });
  }

  setActionsEventListeners() {
    this.table.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.clientEditBtnClass)) {
        const id = target.closest('.table__row').querySelector('.client-id').textContent;
        this.onEditAction(id);
      }

      if (target.classList.contains(this.clientDeleteBtnClass)) {
        const id = target.closest('.table__row').querySelector('.client-id').textContent;
        this.onDeleteAction(id);
      }
    });
  }

  setTooltipsEventListeners() {
    this.table.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.tooltipBtnClass)) {
        target
          .closest(this.tooltipWrapperSelector)
          .classList.toggle(this.tooltipWrapperOpenedClass);
      }
    });
  }

  setEventListeners() {
    this.setSortControlsEventListeners();
    this.setActionsEventListeners();
    this.setTooltipsEventListeners();
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
