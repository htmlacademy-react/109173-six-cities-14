import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { checkAuthAction, fetchOffersAction } from './store/api-action';

import { AuthorizationStatus } from './const';

import App from './components/app/app';

// Префетчинг данных
store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const authStatus = AuthorizationStatus.AUTH;
const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);
export const AuthContext = createContext(isUserLoggedIn);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <AuthContext.Provider value={ isUserLoggedIn }>
        <ToastContainer />
        <App />
      </AuthContext.Provider>
    </Provider>
  </React.StrictMode>
);
