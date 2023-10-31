import { useState } from 'react';
import { OffersListProps, OfferItemProps } from './offers-list.props';
import CardPlace from '../card-place/card-place';

export default function OffersList({ offers }: OffersListProps): React.ReactElement[] {
  const [activeCardId, setActiveCard] = useState(0);

  const cardMouseEnterHandler = (offer: OfferItemProps) => {
    if(activeCardId !== null && activeCardId === offer.id) {
      return;
    }

    setActiveCard(offer.id);
  };

  const CardMouseLeaveHandler = () => {
    setActiveCard(0);
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
