import { AppRoute } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import OfferItem from '../../pages/offer-item/offer-item';
import Login from '../../pages/login/login';
import Page404 from '../../pages/page-404/page-404';
import { useContext } from 'react';
import { AuthContext } from '../..';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Spinner from '../spinner/spinner';

export default function App(): React.ReactElement {
  const offers = useAppSelector((state) => state.offers);
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
              <Main />
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
            <Route path={`${AppRoute.OFFER}/:id`} element={<OfferItem />} />
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
