import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { checkAuthAction, fetchOffersAction } from './store/api-action';
import browserHistory from './browser-history';

import HistoryRouter from './components/history-router/history-router';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import App from './components/app/app';

// Префетчинг данных
store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

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
