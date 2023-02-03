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
    sortControlClass,
    onEditAction,
    onDeleteAction,
    clientEditBtnClass,
    clientDeleteBtnClass,
    tooltipBtnClass,
    tooltipWrapperSelector,
    tooltipWrapperOpenedClass,
    sortControlReversedClass,
    sortControlActiveClass,
  }) {
    this.table = tableElement;
    this.tableHead = tableHead;
    this.sortControlClass = sortControlClass;
    this.onEditAction = onEditAction;
    this.onDeleteAction = onDeleteAction;
    this.clientEditBtnClass = clientEditBtnClass;
    this.clientDeleteBtnClass = clientDeleteBtnClass;
    this.tooltipBtnClass = tooltipBtnClass;
    this.tooltipWrapperSelector = tooltipWrapperSelector;
    this.tooltipWrapperOpenedClass = tooltipWrapperOpenedClass;
    this.sortControlReversedClass = sortControlReversedClass;
    this.sortControlActiveClass = sortControlActiveClass;
    this.allSortControlls = Array.from(tableHead.querySelectorAll(`.${sortControlClass}`));
  }

  dropSortingIndication() {
    this.allSortControlls.forEach((sortControl) => {
      sortControl.classList.remove(this.sortControlActiveClass);
      sortControl.classList.remove(this.sortControlReversedClass);
    });
  }

  setSortControlsEventListeners() {
    this.tableHead.addEventListener('click', ({ target }) => {
      if (target.classList.contains(this.sortControlClass)) {
        const { sortMethodName } = target.dataset;

        // if button clicked another time
        if (this.currentSortMethodName !== sortMethodName) {
          this.dropSortingIndication();

          target.classList.add(this.sortControlActiveClass);

          this.currentSortMethodName = sortMethodName;

          this.clientsToDisplay = state.getClientsSortedBy(this.currentSortMethodName);
        } else {
          target.classList.toggle(this.sortControlReversedClass);
          this.clientsToDisplay.reverse();
        }

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

  syncWithState() {
    this.dropSortingIndication();
    this.currentSortMethodName = null;
    this.clientsToDisplay = state.getClients();
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
