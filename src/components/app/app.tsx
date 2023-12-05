import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { getOffers, getOffersLoadingStatus } from '../../store/slices/offers-data-process/selectors';
import { AppRoute } from '../../const';

import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import MainEmpty from '../../pages/main-empty/main-empty';
import Favorites from '../../pages/favorites/favorites';
import OfferItem from '../../pages/offer-item/offer-item';
import Login from '../../pages/login/login';
import Page404 from '../../pages/page-404/page-404';

export default function App(): React.ReactElement {
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const offers = useAppSelector(getOffers);
  const itHasOffers = (offers?.length > 0);

  if(isOffersLoading) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.MAIN} element={ <Layout /> }>
          { itHasOffers && <Route index element={ <Main /> } /> }
          { !itHasOffers && <Route index element={ <MainEmpty /> } /> }
          <Route
            path={AppRoute.FAVORITES}
            element={
              <PrivateRoute redirectTo={AppRoute.LOGIN}>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={`${ AppRoute.OFFER }/:id`} element={ <OfferItem /> } />
          <Route path={ AppRoute.LOGIN } element={ <Login /> } />
        </Route>
        <Route path="*" element={ <Page404 /> } />
      </Routes>
    </HelmetProvider>
  );
}
