import { FAVORITES_COUNT } from '../../const';
import { FavoritesProps } from '../../types/favorites';
import FavoriteLocation from '../favorite-location/favorite-location';

export default function FavoriteCards({ offers }: FavoritesProps): React.ReactElement {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        <FavoriteLocation city="Amsterdam" offers={ offers.slice(0, FAVORITES_COUNT - 1) } />
        <FavoriteLocation city="Cologne" offers={ offers.slice(FAVORITES_COUNT - 1, FAVORITES_COUNT) } />
      </ul>
    </section>
  );
}
