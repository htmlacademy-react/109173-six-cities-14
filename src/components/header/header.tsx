import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Navigation from '../navigation/navigation';

export default function Header(): React.ReactElement {
  return (
    <header className="header" data-testid="headerElem">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={ 81 } height={ 41 } data-testid="headerLogoElem"/>
            </Link>
          </div>

          <Navigation />
        </div>
      </div>
    </header>
  );
}
