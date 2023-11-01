import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type HeaderProps = {
  isUserLoggedIn?: boolean;
}

function Navigation(): React.ReactElement {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">3</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to={AppRoute.LOGIN}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default function Header({ isUserLoggedIn }: HeaderProps): React.ReactElement {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={ 81 } height={ 41 } />
            </Link>
          </div>

          { isUserLoggedIn && <Navigation /> }
        </div>
      </div>
    </header>
  );
}
