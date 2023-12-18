import icons from "@/assets/icons/icons.svg";

type RecipeSearchType = {};

const RecipeSearch = () => {
  return (
    <form className="search">
      <input
        type="text"
        name="search"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

const Result = () => {
  return null;
};
RecipeSearch.Result = Result;

/*
const Form = () => {
  return (
    <form className="search">
      <input
        type="text"
        name="search"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href={`${icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

RecipeSearch.Form = Form;
*/

export default RecipeSearch;
