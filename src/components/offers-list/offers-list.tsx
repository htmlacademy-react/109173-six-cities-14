import { useState } from 'react';
import { OffersListProps, OfferItemProps } from './offers-list.props';
import CardPlace from '../card-place/card-place';

export default function OffersList({ offers }: OffersListProps): React.ReactElement[] {
  const [activeCard, setActiveCard] = useState(null);

  const cardMouseEnterHandler = (offer: OfferItemProps) => {
    if(activeCard !== null && activeCard.id === offer.id) {
      return;
    }

    setActiveCard(offer);
  };

  const CardMouseLeaveHandler = () => {
    setActiveCard(null);
  };

  return (
    offers.map((offer): React.ReactElement => {
      const offerId: number = offer.id;

      return (
        <CardPlace
          onMouseEnter={() => cardMouseEnterHandler(offer)}
          onMouseLeave={CardMouseLeaveHandler}
          key={ offerId }
          offerItem={ offer }
        />
      );
    })
  );
}
