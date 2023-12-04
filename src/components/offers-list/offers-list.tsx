import { Offer, Offers } from '../../types/offer';
import CardPlace from '../card-place/card-place';

type OffersListProps = {
  offers: Offers;
  isNearby?: boolean;
  onSelectPoint: (offer: Offer | null) => void;
};

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
