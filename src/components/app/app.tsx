import { AppRoute } from '../../const';
import { AppProps } from './app-props';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { adaptOffersToPoints, getOffersByCity } from '../../utils/offer';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import OffersItem from '../../pages/offers-item/offers-item';
import Login from '../../pages/login/login';
import Page404 from '../../pages/page-404/page-404';
import { useContext } from 'react';
import { AuthContext } from '../..';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Spinner from '../spinner/spinner';

export default function App({
  comments
}: AppProps): React.ReactElement {
  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const cityOffers = getOffersByCity(currentCity, offers); // < -- Переделать на хук?

  const mapPoints = adaptOffersToPoints(cityOffers);

  const isUserLoggedIn = useContext(AuthContext);

  if(offers.length <= 0) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.MAIN} element={<Layout />}>
            <Route index element={
              <Main
                mapPoints={ mapPoints }
                offers={ cityOffers }
              />
            }
            />
            <Route
              path={AppRoute.FAVORITES}
              element={
                <PrivateRoute redirectTo={AppRoute.LOGIN} isUserLoggedIn={ isUserLoggedIn }>
                  <Favorites offers={ offers } />
                </PrivateRoute>
              }
            />
            {/* TODO: Урбать передачу офферов - дергать только в момент открытия конкретного оффера, чтобы получить места поблизости */}
            <Route path={`${AppRoute.OFFER}/:id`} element={<OffersItem offers={ cityOffers } comments={ comments } mapPoints={ mapPoints } />} />
            <Route
              path={AppRoute.LOGIN}
              element={
                <PrivateRoute redirectTo={AppRoute.MAIN} isUserLoggedIn={ isUserLoggedIn }>
                  <Login />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
