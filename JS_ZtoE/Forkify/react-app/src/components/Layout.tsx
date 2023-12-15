import "@/sass/main.scss";
import Header from "@/components/Header";
import RecipeSearchResult from "@/components/Result";

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <RecipeSearchResult />
    </div>
  );
};

export default Layout;
