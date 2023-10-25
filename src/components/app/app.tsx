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

const currentAuthStatus = AuthorizationStatus.Auth;

export default function App({ locations, offers, offersCount }: AppProps): React.ReactElement {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Main} element={<Layout />}>
            <Route index element={<Main locations={ locations } offers={ offers } offersCount = { offersCount }></Main>} />
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute redirectTo={AppRoutes.Login} authStatus={currentAuthStatus}>
                  <Favorites offers={ offers } />
                </PrivateRoute>
              }
            />
            <Route path={`${AppRoutes.Offer}/:id`} element={<Offer offers={ offers } />} />
            <Route
              path={AppRoutes.Login}
              element={
                <PrivateRoute redirectTo={AppRoutes.Main} authStatus={currentAuthStatus}>
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
