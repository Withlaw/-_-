class ContentTitle {
  _data;
  generateMarkup(data) {
    this._data = data;
    return `
          <div class="content_title">
              <h1> ${this._data} </h1>
          </div>
      `;
  }
}

export default new ContentTitle();
