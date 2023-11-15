import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';

function Navigation(): React.ReactElement {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);
  const isLoginPage = (location === AppRoute.LOGIN);
  const userInfo = useAppSelector((state) => state.userInfo);
  const favorites = useAppSelector((state) => state.favorites);

  function logoutClickHandler() {
    dispatch(logoutAction());
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          isUserLoggedIn && (
            <>
              <li className="header__nav-item user">
                <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{ userInfo ? userInfo.email : '' }</span>
                  {
                    (favorites && favorites.length > 0) && (
                      <span className="header__favorite-count">{ favorites.length }</span>
                    )
                  }

                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={AppRoute.LOGIN}>
                  <span className="header__signout" onClick={ logoutClickHandler }>Sign out</span>
                </Link>
              </li>
            </>
          )
        }
        {
          (!isUserLoggedIn && !isLoginPage) && (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={ AppRoute.LOGIN }>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

export default function Header(): React.ReactElement {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.MAIN}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={ 81 } height={ 41 } />
            </Link>
          </div>

          <Navigation />
        </div>
      </div>
    </header>
  );
}
