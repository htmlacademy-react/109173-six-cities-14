import { Offers } from '../../types/offer';
import CardPlace from '../card-place/card-place';

type FavoriteLocationProps = {
  city: string;
  offers: Offers | undefined;
};

export default function FavoriteLocation({ city, offers }: FavoriteLocationProps): React.ReactElement {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{ city }</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers?.map((offer): React.ReactElement =>
            <CardPlace key={ offer.id } offerItem={ offer } isCompact/>
          )
        }
      </div>
    </li>
  );
}
