import FooterNav from "./components/footer/footer-nav";
import logo from "./assets/img/icon.png";

function Footer() {
  return (
    <footer className="footer">
      <FooterNav />
      <img src={logo} alt="Logo" className="footer__logo" />
      <p className="footer__copyright">
        &copy; Copyright by
        <a
          className="footer__link twitter-link"
          target="_blank"
          href="#"
          rel="noreferrer"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own product.
      </p>
    </footer>
  );
}

export default Footer;
