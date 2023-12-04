import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';

import { Offers } from '../../types/offer';
import { getOffersByCities } from '../../utils/common';

import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoriteCards from '../../components/favorite-cards/favorite-cards';
import { getFavorites } from '../../store/slices/favorites-data-process/selectors';

type MappedFavoriteOffers = Map<string, Offers>

export default function Favorites(): React.ReactElement {
  const favorites = useAppSelector(getFavorites);
  const favoritesByCities: MappedFavoriteOffers = getOffersByCities(favorites);

  return (
    <div className="page__favorites-container container">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>

      {(favorites?.length <= 0
          && <FavoritesEmpty />)
          || <FavoriteCards offers={ favoritesByCities } />}
    </div>
  );
}
