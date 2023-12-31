export default function Footer(): React.ReactElement {
  return (
    <footer className="footer" data-testid="footerElem">
      <a className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={ 64 } height={ 33 } data-testid="footerLogoElem"/>
      </a>
    </footer>
  );
}
