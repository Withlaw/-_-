class Header {
  _data;
  _parentElement = document.querySelector(".app");

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
      `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHanderRouting() {
    // const headerEl =
    document.querySelector("header").addEventListener("click", e => {
      const navbtn = e.target.closest(".menu_name");
      if (!navbtn) return;

      console.log(navbtn.textContent);

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

export default new Header();
