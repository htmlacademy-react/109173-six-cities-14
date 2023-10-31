import React from 'react';
import ReactDOM from 'react-dom/client';

import { offers } from './mocks/offers';
import { locations } from './mocks/locations';
import { mapPoints } from './mocks/map-points';
import { OFFERS_COUNT } from './const';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      locations={ locations }
      mapPoints={ mapPoints }
      offers={ offers }
      offersCount={ OFFERS_COUNT }
    />
  </React.StrictMode>
);
