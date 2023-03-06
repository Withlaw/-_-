import contentTitle from "../components/ContentTitle.js";

class HomePage {
  _data;
  _parentElement;

  render(data) {
    this._data = data;
    this._parentElement = document.querySelector("#page_content");

    const markup = `
              ${contentTitle.generateMarkup("Great PeoPle ")}
              <div id="cards_container">
                  ${this._data
                    .map((el, idx) => {
                      return `
                      <div idx="${idx}" class="card">
                        <div class="card_plane card_plane--front">${el.nickname}</div>
                        <div class="card_plane card_plane--back">${el.mbti}</div>
                      </div>
                    `;
                    })
                    .join("")}
              </div>
      `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addHanderRouting(hander) {
    document.querySelector("header").addEventListener("click", e => {
      const navbtn = e.target.closest(".menu_name");
      if (!navbtn) return;

      switch (navbtn.textContent) {
        case "HOME":
          window.history.pushState(null, "", "/web/");
          break;
        case "SIGNUP":
          window.history.pushState(null, "", "/web/signup");
          break;
      }
    });
  }
}

export default new HomePage();
