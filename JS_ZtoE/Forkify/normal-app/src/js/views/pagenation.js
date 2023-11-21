import View from "./View";
import icons from "url:../../img/icons.svg";

class Pagenation extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // if (!numPage) return '';
    if (numPage <= 1 || curPage > numPage) return "";
    if (curPage === 1) return this._generateMarkupNext(curPage);
    if (curPage === numPage) return this._generateMarkupPreview(curPage);
    return (
      this._generateMarkupPreview(curPage) + this._generateMarkupNext(curPage)
    );
  }

  _generateMarkupPreview(page) {
    return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page - 1}</span>
  </button>`;
  }
  _generateMarkupNext(page) {
    return `
  <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
  </button>
`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest("li");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new Pagenation();
