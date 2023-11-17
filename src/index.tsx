import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { offers } from './mocks/offers';
import { comments } from './mocks/comments';
import { cities } from './mocks/cities';
import { AuthorizationStatus, OFFERS_COUNT } from './const';

import App from './components/app/app';

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
          offers={ offers }
          offersCount={ OFFERS_COUNT }
          comments={ comments }
        />
      </AuthContext.Provider>
    </Provider>
  </React.StrictMode>
);
