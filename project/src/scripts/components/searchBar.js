export default class InputWrapper {
  constructor({ inputElement, onInput }) {
    this.input = inputElement;
    this.onInput = onInput;

    this.setEventListeners();
  }

  setEventListeners() {
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        this.onInput(this.input.value);
      }, 300);
    });
  }
}
