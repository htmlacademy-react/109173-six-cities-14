import { Outlet, useLocation } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/slices/favorites-data-process/selectors';
import { getOffers } from '../../store/slices/offers-data-process/selectors';

const CSSClasses = {
  PAGE_WRAPPER: 'page',
  MAIN_BASE: 'page__main',

  MAIN_WRAPPER: ' page--gray page--main',
  LOGIN_WRAPPER: ' page--gray page--login',
  FAVORITES_EMPTY_WRAPPER: ' page--favorites-empty',

  OFFER: ' page--gray page--login',
  FAVORITES: ' page__main--favorites',

  MAIN_MODE: ' page__main--index',
  MAIN_EMPTY_MODE: ' page__main--index-empty', // <- Определить условия
  FAVORITES_EMPTY_MODE: ' page__main--favorites-empty',
  OFFER_MODE: ' page__main--offer',
  LOGIN_MODE: ' page__main--login',
};

export default function Layout(): React.ReactElement {
  const location = useLocation();
  const isFavoritesPage = (location.pathname === String(AppRoute.FAVORITES));

  const favorites = useAppSelector(getFavorites);
  const isFavoritesEmpty = (favorites?.length <= 0);

  const offers = useAppSelector(getOffers);
  const isMainEmpty = (offers?.length <= 0);

  let pageWrapperClassName = String(CSSClasses.PAGE_WRAPPER);
  let mainClassName = String(CSSClasses.MAIN_BASE);

  switch(location.pathname) {
    case AppRoute.MAIN: {
      pageWrapperClassName += CSSClasses.MAIN_WRAPPER;
      mainClassName += CSSClasses.MAIN_MODE;

      if(isMainEmpty) {
        mainClassName += CSSClasses.MAIN_EMPTY_MODE;
      }
      break;
    }
    case AppRoute.OFFER: {
      mainClassName += CSSClasses.OFFER_MODE;
      break;
    }
    case AppRoute.FAVORITES: {
      mainClassName += CSSClasses.FAVORITES;

      if(isFavoritesEmpty) {
        pageWrapperClassName += CSSClasses.FAVORITES_EMPTY_WRAPPER;
        mainClassName += CSSClasses.FAVORITES_EMPTY_MODE;
      }

      break;
    }
    case AppRoute.LOGIN: {
      pageWrapperClassName += CSSClasses.LOGIN_WRAPPER;
      mainClassName += CSSClasses.LOGIN_MODE;
      break;
    }
  }

  return (
    <div className={`${pageWrapperClassName}`}>
      <Header />

      <main className={`${mainClassName}`}>
        <Outlet />
      </main>


      { isFavoritesPage && <Footer /> }
    </div>
  );
}
