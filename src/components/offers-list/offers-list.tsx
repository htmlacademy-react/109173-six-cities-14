import { OffersListProps } from './offers-list-props';
import CardPlace from '../card-place/card-place';

export default function OffersList({ offers, isNearby, onSelectPoint }: OffersListProps): React.ReactElement[] {
  return (
    offers.map((offer): React.ReactElement => {
      const offerId = offer.id;

      return (
        <CardPlace
          onMouseEnter={() => onSelectPoint(offer)}
          onMouseLeave={() => onSelectPoint(null)}
          key={ offerId }
          offerItem={ offer }
          isNearby={ isNearby }
        />
      );
    })
  );
}
