import { AppRoutes, AuthorizationStatus } from '../../const';
import { AppProps } from './app.props';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Page404 from '../../pages/page-404/page-404';

export default function App({ offersCount }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main} element={<Layout />}>
            <Route index element={<Main offersCount = { offersCount }></Main>} />
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute authStatus={AuthorizationStatus.Auth}>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={AppRoutes.Offer}>
              <Route index element={<Offer />} />
              <Route path=":id" element={<Offer />} />
            </Route>
            <Route path={AppRoutes.Login} element={<Login />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
