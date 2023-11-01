import { AppRoutes } from '../../const';
import { AppProps } from './app-props';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Page404 from '../../pages/page-404/page-404';
import { useContext } from 'react';
import { AuthContext } from '../..';

export default function App({ locations, mapPoints, offers, offersCount }: AppProps): React.ReactElement {
  const isUserLoggedIn = useContext(AuthContext);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main} element={<Layout />}>
            <Route index element={
              <Main
                locations={ locations }
                mapPoints={ mapPoints }
                offers={ offers }
                offersCount = { offersCount }
              />
            }
            />
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute redirectTo={AppRoutes.Login} isUserLoggedIn={ isUserLoggedIn }>
                  <Favorites offers={ offers } />
                </PrivateRoute>
              }
            />
            <Route path={`${AppRoutes.Offer}/:id`} element={<Offer offers={ offers } />} />
            <Route
              path={AppRoutes.Login}
              element={
                <PrivateRoute redirectTo={AppRoutes.Main} isUserLoggedIn={ isUserLoggedIn }>
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
