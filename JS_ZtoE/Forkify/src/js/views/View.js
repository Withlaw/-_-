import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data, render = true) {
    // console.log('data: ', data);
    if (!data || (Array.isArray(data) && !data.length))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && !data.length))
    //   return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markup); // 문자열을 돔 노드 객체로 변환함
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // update는 추가나 제거가 아니라 기존에 있는 것을 수정하는 것이기 때문에 노드의 계층 구조는 변함이 없다.

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // nodeValue 문서를 보면 노드들 가운데에 text노드의 컨텐트만 반환하고 나머지 다른 노드는 null을 반환한다.
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }

      /*
      // 리팩토링
      if(newEl.isEqualNode(curEl) continue; // guard clause
      if(newEl.firstChild?.nodeValue.trim() !== "") curEl.textContent = newEl.textContent;
      Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      */
    });
  }
}
