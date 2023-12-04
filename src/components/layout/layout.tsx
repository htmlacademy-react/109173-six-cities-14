import { Outlet, useLocation } from 'react-router-dom';

import { getFavorites } from '../../store/slices/favorites-data-process/selectors';
import { useAppSelector } from '../../hooks';
import { AppRoute, cities } from '../../const';

import Header from '../header/header';
import Footer from '../footer/footer';
import CitiesList from '../cities-list/cities-list';
import useCityOffers from '../../hooks/useCityOffers';

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

  const cityOffers = useCityOffers();
  const isMainEmpty = (cityOffers?.length <= 0);
  const currentOfferRexExp = new RegExp('/offer/[\\d\\w-]*', 'gm');
  const isOfferPage = currentOfferRexExp.test(location.pathname);

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

  if(isOfferPage) {
    mainClassName += CSSClasses.OFFER_MODE;
  }

  return (
    <div className={`${pageWrapperClassName}`}>
      <Header />

      <main className={`${mainClassName}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            { cities && <CitiesList /> }
          </section>
        </div>

        <Outlet />
      </main>


      { isFavoritesPage && <Footer /> }
    </div>
  );
}
