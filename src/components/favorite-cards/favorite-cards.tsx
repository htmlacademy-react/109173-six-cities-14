import { FavoritesProps } from '../../types/favorites';
import FavoriteLocation from '../favorite-location/favorite-location';

export default function FavoriteCards({ offers }: FavoritesProps): React.ReactElement {
  const favoriteCities = Array.from(offers.keys());

  return (
    <section className="favorites" data-testid="favoritesElem">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list" data-testid="favoritesList">
        {
          (favoriteCities?.length > 0) && favoriteCities.map((city) =>
            <FavoriteLocation key={ city } city={ city } offers={ offers?.get(city) } />)
        }
      </ul>
    </section>
  );
}
