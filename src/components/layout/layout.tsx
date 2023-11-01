import { Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../..';

import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoutes } from '../../const';

const enum CSSClasses {
  PageContainer = 'page',
  MainContainer = 'page__main',
  Main = 'page--gray page--main',
  Login = 'page--gray page--login',
  MainMode = 'page__main--index',
  OfferMode = 'page__main--offer',
  LoginMode = 'page__main--login',
}

export default function Layout(): React.ReactElement {
  const location = useLocation();
  const isFavoritesPage = (location.pathname === String(AppRoutes.Favorites));
  const isUserLoggedIn = useContext(AuthContext);

  let pageClassName = String(CSSClasses.PageContainer);
  let mainClassName = String(CSSClasses.MainContainer);

  switch(location.pathname) {
    case AppRoutes.Favorites: {
      mainClassName += CSSClasses.OfferMode;
      break;
    }

    case AppRoutes.Main: {
      pageClassName += CSSClasses.Main;
      mainClassName += CSSClasses.MainMode;
      break;
    }

    case AppRoutes.Login: {
      pageClassName += CSSClasses.Login;
      mainClassName += CSSClasses.LoginMode;
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
