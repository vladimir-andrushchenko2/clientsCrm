import { createContactField } from '../elementGenerators';

function fillContact({
  contactElement,
  type,
  value,
  userContactsInputSelector,
  currentContactTypeDisplaySelector,
  contactTypeToStringMap,
}) {
  const input = contactElement.querySelector(userContactsInputSelector);
  input.value = value;
  input.name = type;

  if (type === 'email') {
    input.type = 'email';
  } else if (type === 'tel') {
    input.type = 'tel';
  } else {
    input.type = 'text';
  }

  const display = contactElement.querySelector(currentContactTypeDisplaySelector);

  display.textContent = contactTypeToStringMap[type];
}

function fillForm({
  form, name, lastName, surname, contacts, selectors,
}) {
  const { elements } = form;
  elements.name.value = name;
  elements.lastName.value = lastName;
  elements.surname.value = surname;

  const contactsContainer = form.querySelector(selectors.contactsContainerSelector);

  contactsContainer.innerHTML = '';

  contacts.forEach(({ type, value }) => {
    const newContactField = createContactField();

    fillContact({
      contactElement: newContactField,
      type,
      value,
      ...selectors,
    });

    contactsContainer.append(newContactField);
  });
}

export { fillForm, fillContact };
