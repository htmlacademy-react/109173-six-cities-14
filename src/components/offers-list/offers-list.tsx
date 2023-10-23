import { useState } from 'react';
import { OffersListProps, OfferItemProps } from './offers-list.props';
import CardPlace from '../card-place/card-place';

export default function OffersList({ offers }: OffersListProps): React.ReactElement[] {
  const [activeCard, setActiveCard] = useState(offers[0]);

  const cardMouseOverHandler = (offer: OfferItemProps) => {
    if(activeCard.id === offer.id) {
      return;
    }

    setActiveCard(offer);
  };

  return (
    offers.map((offer): React.ReactElement => {
      const offerId: number = offer.id;

      return <CardPlace onMouseOver={() => cardMouseOverHandler(offer)} key={ offerId } offerItem={ offer }></CardPlace>;
    })
  );
}
