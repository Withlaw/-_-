const RecipeSearchResult = () => {
  return (
    <div className="search-results">
      <ul className="results">
        <li className="preview">
          <a className="preview__link preview__link--active" href="#23456">
            <figure className="preview__fig">
              <img src="src/img/test-1.jpg" alt="Test" />
            </figure>
            <div className="preview__data">
              <h4 className="preview__title">Pasta with Tomato Cream ...</h4>
              <p className="preview__publisher">The Pioneer Woman</p>
              <div className="preview__user-generated">
                <svg>
                  <use href="src/img/icons.svg#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>

      <div className="pagination"></div>

      <p className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
          rel="noreferrer"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
};

export default RecipeSearchResult;
