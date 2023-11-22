import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';
import { getOffers } from '../../store/slices/offers-data-process/selectors';
import { AppRoute } from '../../const';

import { browserHistory } from '../../browser-history';
import HistoryRoute from '../history-route/history-route';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import OfferItem from '../../pages/offer-item/offer-item';
import Login from '../../pages/login/login';
import Page404 from '../../pages/page-404/page-404';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

export default function App(): React.ReactElement {
  const offers = useAppSelector(getOffers);

  // TODO: Надо опираться не на количество офферов, а на какой-нибудь статус типа isOffersLoading,
  // чтобы в случае неудачи - показывать пустую страницу с возможностью перезагрузить офферы (может быть)
  if(offers?.length <= 0) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <HistoryRoute history={ browserHistory }>
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
                <PrivateRoute redirectTo={AppRoute.LOGIN}>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={`${AppRoute.OFFER}/:id`} element={<OfferItem />} />
            <Route
              path={AppRoute.LOGIN}
              element={
                <PrivateRoute redirectTo={AppRoute.MAIN}>
                  <Login />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </HistoryRoute>
    </HelmetProvider>
  );
}
