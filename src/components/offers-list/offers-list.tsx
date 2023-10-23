// import { useState } from 'react';
import { OffersListProps } from './offers-list.props';
import CardPlace from '../card-place/card-place';

export default function OffersList({ offers }: OffersListProps): React.ReactElement[] {
  // const [activeCard, setActiveCard] = useState(offers[0]);

  return (
    offers.map((offer): React.ReactElement => {
      const offerId: number = offer.id;

      return <CardPlace key={ offerId } offerItem={ offer }></CardPlace>;
    })
  );
}
