import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import { offers } from './mocks/offers';
import { comments } from './mocks/comments';
import { locations } from './mocks/locations';
import { mapPoints } from './mocks/map-points';
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
    <AuthContext.Provider value={ isUserLoggedIn }>
      <App
        locations={ locations }
        mapPoints={ mapPoints }
        offers={ offers }
        offersCount={ OFFERS_COUNT }
        comments={ comments }
      />
    </AuthContext.Provider>
  </React.StrictMode>
);
