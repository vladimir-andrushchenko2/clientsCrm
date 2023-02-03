export default class UserForm {
  constructor({
    formElement,
    userInfoInputSelector,
    userContactsInputSelector,
    onSubmit,
    formSecondaryActionBtnSelector,
    onSecondaryAction,
  }) {
    this._form = formElement;
    this._userInfoInputSelector = userInfoInputSelector;
    this._userContactsInputSelector = userContactsInputSelector;
    this._onSubmit = onSubmit;
    this._onSecondaryAction = onSecondaryAction?.bind(this);
    this._secondaryActionBtn = this._form.querySelector(formSecondaryActionBtnSelector);

    this.submitHandler = this._handleSubmit.bind(this);

    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', this.submitHandler);
    this._secondaryActionBtn.addEventListener('click', this._onSecondaryAction);
  }

  _handleSubmit(event) {
    event.preventDefault();

    this._onSubmit(this.getInputs());
  }

  reset() {
    this._form.reset();
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
      output.contacts.push({ type: name, value });
    });

    return output;
  }
}
