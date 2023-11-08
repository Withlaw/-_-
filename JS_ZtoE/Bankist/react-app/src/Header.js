import HeaderTitle from "./components/header/header-title";
import Nav from "./components/navigation/navigation";

function Header() {
  return (
    <header className="header">
      <Nav />
      <HeaderTitle />
    </header>
  );
}

export default Header;
