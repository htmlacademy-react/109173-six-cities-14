import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { checkAuthAction, fetchFavoritesAction, fetchOffersAction } from './store/api-action';
import { getAuthStatus } from './store/slices/user-process/selectors';
import browserHistory from './browser-history';

import HistoryRouter from './components/history-route/history-route';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import App from './components/app/app';
import { AuthorizationStatus } from './const';

// Префетчинг данных
store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

// Запрашиваеи список "Избранного" только для авторизованного пользователя
const authStatus = getAuthStatus(store.getState());

if(authStatus === AuthorizationStatus.AUTH) {
  store.dispatch(fetchFavoritesAction());
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ToastContainer />
      <HistoryRouter history={ browserHistory }>
        <ScrollToTop />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
