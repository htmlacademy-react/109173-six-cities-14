import { Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../..';

import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';

const CSSClasses = {
  'PAGE_CONTAINER': 'page',
  'MAIN_CONTAINER': 'page__main',
  'MAIN': 'page--gray page--main',
  'LOGIN': 'page--gray page--login',
  'MAIN_MODE': 'page__main--index',
  'OFFER_MODE': 'page__main--offer',
  'LOGIN_MODE': 'page__main--login',
};

export default function Layout(): React.ReactElement {
  const location = useLocation();
  const isFavoritesPage = (location.pathname === String(AppRoute.FAVORITES));
  const isUserLoggedIn = useContext(AuthContext);

  let pageClassName = String(CSSClasses.PAGE_CONTAINER);
  let mainClassName = String(CSSClasses.MAIN_CONTAINER);

  switch(location.pathname) {
    case AppRoute.FAVORITES: {
      mainClassName += CSSClasses.OFFER_MODE;
      break;
    }

    case AppRoute.MAIN: {
      pageClassName += CSSClasses.MAIN;
      mainClassName += CSSClasses.MAIN_MODE;
      break;
    }

    case AppRoute.LOGIN: {
      pageClassName += CSSClasses.LOGIN;
      mainClassName += CSSClasses.LOGIN_MODE;
      break;
    }
  }

  return (
    // + page page--gray page--login || page page--gray page--main || page__main--offer"
    <div className={`${pageClassName}`}>
      <Header isUserLoggedIn={ isUserLoggedIn } />

      <main className={`${mainClassName}`}>
        <Outlet />
      </main>


      { isFavoritesPage && <Footer /> }
    </div>
  );
}
