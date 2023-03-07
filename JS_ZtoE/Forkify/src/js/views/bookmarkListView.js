import View from "./View";
import icons from "url:../../img/icons.svg";

class BookmarksListView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  _generateMarkup() {
    return `
    ${this._data.map(this._generateMarkupPreview).join("")}
    `;
  }

  _generateMarkupPreview(data) {
    return `      
    <li class="preview">
      <a class="preview__link" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__name">
          ${data.title.split(" ").slice(0, 3).join(" ") + "..."}
          </h4>
          <p class="preview__publisher">${data.publisher}</p>
        </div>
      </a>
    </li>
  `;
  }
}

export default new BookmarksListView();
