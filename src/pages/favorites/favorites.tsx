import { Helmet } from 'react-helmet-async';

import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoriteCards from '../../components/favorite-cards/favorite-cards';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/slices/favorites-data-process/selectors';

export default function Favorites(): JSX.Element {
  const favorites = useAppSelector(getFavorites);

  return (
    <div className="page__favorites-container container">
      <Helmet>
        <title>6 cities - Favorites</title>
      </Helmet>

      {(favorites?.length <= 0
          && <FavoritesEmpty />)
          || <FavoriteCards offers={ favorites } />}
    </div>
  );
}
