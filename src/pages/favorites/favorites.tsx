import { Helmet } from 'react-helmet-async';

import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoriteCards from '../../components/favorite-cards/favorite-cards';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/slices/favorites-data-process/selectors';
import { Offers } from '../../types/offer';


export default function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const favoritesByCities: Map<string, Offers> = new Map();

  favorites.map((offer) => {
    const city = offer.city.name;

    if(favoritesByCities.has(city)) {
      const cityOffers = favoritesByCities.get(city);

      if(cityOffers) {
        cityOffers?.push(offer);

        favoritesByCities.set(city, cityOffers);
      }
    } else {
      favoritesByCities.set(city, [ offer ]);
    }
  });

  return (
    <div className="page__favorites-container container">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>

      {(favorites?.length <= 0
          && <FavoritesEmpty />)
          || <FavoriteCards offers={ favoritesByCities } />}
    </div>
  );
}
