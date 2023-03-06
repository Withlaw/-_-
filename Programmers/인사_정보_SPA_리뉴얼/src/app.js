class App {
  _data;
  _parentElement = document.querySelector(".app");

  constructor() {
    this.render();
  }

  render() {
    const markup = `
          <header>
              <div class="header header_left">
                  <span class="menu_name" id="menu_home">HOME</span>
              </div>
              <div class="header header_right">
                  <span class="menu_name" id="menu_signup">SIGNUP</span>
              </div>
          </header>
          <main id="page_content">
          </main>
      `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerLoad(hanlder) {
    window.addEventListener("load", hanlder);
  }

  addHanderRouting(handler) {
    document.querySelector("header").addEventListener("click", e => {
      const navbtn = e.target.closest(".menu_name");
      if (!navbtn) return;

      switch (navbtn.textContent) {
        case "HOME":
          window.history.pushState(null, "", "/");
          handler("/");
          break;
        case "SIGNUP":
          window.history.pushState(null, "", "/signup");
          handler("/signup");
          break;
      }
    });
    window.addEventListener("popstate", e => {
      handler(e.target.location.pathname);
    });
  }
}

export default new App();
