/* eslint-disable quote-props */
import clients from './data/clients';

const clientRowTemplate = document.querySelector('#contact-table-row');
const clientContactTooltipTemplate = document.querySelector('#contact-tooltip');

const clientsTable = document.querySelector('.table-clients-container');

function formatDate(dateString) {
  let [date, time] = dateString.split('T');
  // first 5 chars is hours, semicolon, minutes
  time = time.slice(0, 5);
  date = date.split('-').join('.');
  return { time, date };
}

// .contact-tooltip-(facebook|email|other|vk|tel)-icon;
const ContactTypeToBgImgClsConfig = {
  'facebook': 'contact-tooltip-facebook-icon',
  'email': 'contact-tooltip-email-icon',
  'other': 'contact-tooltip-other-icon',
  'tel': 'contact-tooltip-tel-icon',
  'vk': 'contact-tooltip-vk-icon',
};

function createContactTooltipElement({ type, value }) {
  const tooltip = clientContactTooltipTemplate.content.cloneNode(true);

  const button = tooltip.querySelector('.contact-show-tooltip-btn');
  const classWithBackgroundImage = ContactTypeToBgImgClsConfig[type] ?? 'contact-tooltip-other-icon';
  button.classList.add(classWithBackgroundImage);

  const tooltipWindow = tooltip.querySelector('.tooltip');
  const anchor = document.createElement('a');

  if (type === 'tel') {
    anchor.href = `tel:${value}`;
    anchor.textContent = value;
    anchor.classList.add('contact__tel');
    tooltipWindow.append(anchor);
  } else if (type === 'email') {
    anchor.href = `email:${value}`;
    anchor.textContent = value;
    anchor.classList.add('contact__link');
    tooltipWindow.append(anchor);
  } else {
    anchor.href = value;
    anchor.textContent = value;
    tooltipWindow.append(`${type}: `, anchor);
  }

  return tooltip;
}

function createClientRowElement({
  id, createdAt, updatedAt, name, surname, lastName, contacts,
}) {
  const row = clientRowTemplate.content.cloneNode(true);

  row.querySelector('.client-id').textContent = id;

  row.querySelector('.client-name').textContent = [surname, name, lastName].join(' ');

  const createdAtObj = formatDate(createdAt);
  const updatedAtObj = formatDate(updatedAt);

  row.querySelector('.client-created-date').textContent = createdAtObj.date;
  row.querySelector('.client-created-time').textContent = createdAtObj.time;
  row.querySelector('.client-edited-date').textContent = updatedAtObj.date;
  row.querySelector('.client-edited-time').textContent = updatedAtObj.time;

  const contactsContainer = row.querySelector('.contacts-wrapper');
  contactsContainer.append(...contacts.map(createContactTooltipElement));

  return row;
}

clientsTable.append(...clients.map(createClientRowElement));
