import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { fetchOffersAction } from './store/api-actions';

import { comments } from './mocks/comments';
import { cities } from './mocks/cities';
import { AuthorizationStatus, OFFERS_COUNT } from './const';

import App from './components/app/app';

store.dispatch(fetchOffersAction());

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
        <App
          cities={ cities }
          offersCount={ OFFERS_COUNT }
          comments={ comments }
        />
      </AuthContext.Provider>
    </Provider>
  </React.StrictMode>
);
