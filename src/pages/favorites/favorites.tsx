import { Helmet } from 'react-helmet-async';

import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoriteCards from '../../components/favorite-cards/favorite-cards';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/slices/favorites-data-process/selectors';
import { Offers } from '../../types/offer';
import { getOffersByCities } from '../../utils/common';


export default function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const favoritesByCities: Map<string, Offers> = getOffersByCities(favorites);

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
