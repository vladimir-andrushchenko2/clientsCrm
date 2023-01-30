// import clients from './data/clients';
import TableApp from './components/table';
import { clientsTable, tableHead } from './constants';

const table = new TableApp({ tableElement: clientsTable, sortControls: tableHead, sortControlSelector: 'table__control' });
table.init();
