import { createClientRowElement } from '../elementGenerators';
import state from '../state/clientsState';

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
        this.currentSort = sortMethodName;
        this.clientsToDisplay = state.getClientsSortedBy(this.currentSort);
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

  render() {
    this.table.innerHTML = '';

    this.table.append(...this.clientsToDisplay.map(createClientRowElement));
  }

  init() {
    this.setEventListeners();
    this.clientsToDisplay = state.getClients();
    this.render();
  }
}
