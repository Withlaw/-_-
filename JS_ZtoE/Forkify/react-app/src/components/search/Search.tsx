import icons from "@/assets/icons/icons.svg";
import useSearch from "@/hooks/useSearch";
import { useSearchParams } from "react-router-dom";

type RecipeSearchType = {};

const RecipeSearch = () => {
  const { searchElementRefTarget, handleSearchSubmit } = useSearch();

  // const [searchParam, setSearchParam] = useSearchParams();
  // const submitHandler   = async (
  //   event: React.FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   const { value } = searchElementRefTarget.current as HTMLInputElement;
  // };

  // <form
  //   className="search"
  //   onSubmit={e => {
  //     e.preventDefault();
  //     setSearchParam({
  //       search: searchElementRefTarget.current?.value as string,
  //     });
  //   }}
  // >

  return (
    <form className="search" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        name="search"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        ref={searchElementRefTarget}
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
