import { AppRoute } from '../../const';
import { AppProps } from './app-props';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { adaptOffersToPoints, getNearestOffersPoint } from '../../utils/offer';
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

export default function App({
  cities,
  offers,
  offersCount,
  comments
}: AppProps): React.ReactElement {

  const isUserLoggedIn = useContext(AuthContext);
  const currentCity = useAppSelector((store) => store.city);
  const nearestOffers = getNearestOffersPoint(currentCity, offers).slice(0, offersCount);
  const mapPoints = adaptOffersToPoints(nearestOffers);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.MAIN} element={<Layout />}>
            <Route index element={
              <Main
                cities={ cities }
                mapPoints={ mapPoints }
                offers={ nearestOffers }
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
            <Route path={`${AppRoute.OFFER}/:id`} element={<OffersItem offers={ nearestOffers } comments={ comments } mapPoints={ mapPoints } />} />
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
