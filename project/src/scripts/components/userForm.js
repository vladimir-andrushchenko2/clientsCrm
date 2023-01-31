export default class UserForm {
  constructor({
    formElement,
    userInfoInputSelector,
    userContactsInputSelector,
    onSubmit,
  }) {
    this._form = formElement;
    this._userInfoInputSelector = userInfoInputSelector;
    this._userContactsInputSelector = userContactsInputSelector;
    this._onSubmit = onSubmit;

    this.submitHandler = this._handleSubmit.bind(this);

    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this.submitHandler);
  }

  _handleSubmit(event) {
    event.preventDefault();

    this._onSubmit(this.getInputs());
  }

  getInputs() {
    const output = Object.create(null);
    output.contacts = [];

    const userInfoInputs = Array.from(this._form.querySelectorAll(this._userInfoInputSelector));
    const userContactInputs = Array.from(
      this._form.querySelectorAll(this._userContactsInputSelector),
    );

    userInfoInputs.forEach(({ name, value }) => {
      output[name] = value;
    });

    userContactInputs.forEach(({ name, value }) => {
      output.contacts.push({ name, value });
    });

    return output;
  }
}
