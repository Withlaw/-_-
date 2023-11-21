import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";

class BookmarksListView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  _generateMarkup() {
    return `
    ${this._data.map(bookmark => previewView.render(bookmark, false)).join("")}
    `;
  }

  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1);
    //   return `
    //   <li class="preview">
    //     <a class="preview__link" href="#${data.id}">
    //       <figure class="preview__fig">
    //         <img src="${data.image}" alt="${data.title}" />
    //       </figure>
    //       <div class="preview__data">
    //         <h4 class="preview__name">
    //         ${data.title.split(" ").slice(0, 3).join(" ") + "..."}
    //         </h4>
    //         <p class="preview__publisher">${data.publisher}</p>
    //       </div>
    //     </a>
    //   </li>
    // `;
    return `
    <li class="preview">
      <a class="preview__link ${
        data.id === id ? "preview__link--active" : ""
      }" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title}</h4>
          <p class="preview__publisher">${data.publisher}</p>
          <div class="preview__user-generated ${data.key ? "" : "hidden"}">
            <svg>
            <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
`;
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksListView();
