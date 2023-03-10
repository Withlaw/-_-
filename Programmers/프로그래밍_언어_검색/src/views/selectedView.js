class SelectedView {
  _data;
  _parentElment = document.querySelector(".SelectedLanguage");

  render(data) {
    this._data =
      data.languagesSelected.length > 5
        ? data.languagesSelected.slice(data.languagesSelected.length - 5)
        : data.languagesSelected;
    const markup = this._generateMarkup();

    this._parentElment.innerHTML = "";
    this._parentElment.insertAdjacentHTML("afterbegin", markup);
  }
  _generateMarkup() {
    return `
        <ul>
          ${this._data
            ?.map(
              el => `
          <li>${el}</li>
          `
            )
            .join("")}
        </ul>
        `;
  }
}

export default new SelectedView();
