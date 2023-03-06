import contentTitle from "../components/ContentTitle.js";

class SignupPage {
  _data;
  _parentElement;

  render() {
    this._parentElement = document.querySelector("#page_content");

    const markup = `
              ${contentTitle.generateMarkup("Great PeoPle ")}
              <div id="form_container">
                  <span class="form_elem">
                      <input id="name" placeholder="이름">
                  </span>
                  <span class="form_elem">
                      <input id="email" placeholder="이메일">
                  </span>
                  <span class="form_elem">
                      <select id="role" name="role">
                          <option value="">직군을 선택해주세요</option>
                          <option value="backend">백엔드</option>
                          <option value="frontend">프론트엔드</option>
                          <option value="fullstack">풀스택</option>
                      </select>
                  </span>
                  <span class="form_elem">
                      <button type="submit">등록</button>
                  </span>
              </div>
      `;

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addHanderRouting() {
    // _parentElement.addEventListener('click', e=>{

    // })
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

export default new SignupPage();
