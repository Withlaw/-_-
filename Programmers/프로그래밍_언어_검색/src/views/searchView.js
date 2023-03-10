class SearchView {
  _data;
  _parentElment = document.querySelector(".SearchInput");
  _inputEl = document.querySelector(".SearchInput__input");

  constructor() {
    this._focusInput();
  }

  render(data) {
    if (data.languages.length === 0) {
      this.delete();
      return;
    }

    this._data = data;
    const markup = this._generateMarkup();

    this.delete();
    this._parentElment.insertAdjacentHTML("afterend", markup);
  }
  _generateMarkup() {
    const indexSelected = this._data.inputFocusedIndexNum;
    return `
          <div class="Suggestion">
              <ul cl>
                  ${this._data.languages
                    .map(
                      (el, idx) => `
                  <li data-set=${idx} class="Suggestion__item ${
                        indexSelected === idx
                          ? "Suggestion__item--selected"
                          : ""
                      }">${el}</li>
                  `
                    )
                    .join("")}
              </ul>
          </div>
      `;
  }

  delete() {
    this._parentElment.nextElementSibling?.remove();
  }

  _focusInput() {
    this._inputEl.focus();
  }

  addHandlerInput(handler) {
    this._inputEl.addEventListener("input", e => {
      handler(e.target.value.trim());
    });
  }

  addHandlerArrow(handler) {
    this._inputEl.addEventListener("keydown", e => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handler(-1);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        handler(+1);
        return;
      }
    });
  }

  addHandlerAlert(hanlder) {
    this._parentElment.addEventListener("submit", e => {
      e.preventDefault();
      hanlder();
    });

    document.querySelector(".App").addEventListener("click", e => {
      const el = e.target.closest(".Suggestion__item");
      if (!el) return;

      hanlder(el.textContent);
    });
  }
}

export default new SearchView();
