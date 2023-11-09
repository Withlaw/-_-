import HeaderTitle from "./components/header/header-title";
import Nav from "./components/navigation/navigation";
import IntersectObsContextProvider from "./context/intersectObsContext";

function Header() {
  return (
    <IntersectObsContextProvider>
      <header className="header">
        <Nav />
        <HeaderTitle />
      </header>
    </IntersectObsContextProvider>
  );
}

export default Header;
