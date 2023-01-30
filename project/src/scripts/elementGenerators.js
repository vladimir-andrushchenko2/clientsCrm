import { clientRowTemplate, clientContactTooltipTemplate } from './constants';
import { formatDate } from './utils';

const ContactTypeToBgImgClsConfig = {
  facebook: 'contact-tooltip-facebook-icon',
  email: 'contact-tooltip-email-icon',
  other: 'contact-tooltip-other-icon',
  tel: 'contact-tooltip-tel-icon',
  vk: 'contact-tooltip-vk-icon',
};

export function makeShowMoreContactsIcon(numberOfAdditionalContact) {
  return (`<span tabindex=0 class="contact-show-more-contacts-btn">
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="7.5" stroke="#9873FF" />
<text style="font-weight: 600; font-size: 8px; line-height: 11px;" class="svg-text" x="3" y="11" fill="#000">+${numberOfAdditionalContact}</text>
</svg>
</span>`);
}

export function makeContactTooltipElement({ type, value }) {
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

export function createClientRowElement({
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
  contactsContainer.append(...contacts.map(makeContactTooltipElement));

  return row;
}
