import { Offer, Offers } from '../../types/offer';
import OffersList from '../offers-list/offers-list';

import { NEARBY_OFFERS_COUNT } from '../../const';

type NearbyOffersProps = {
  offers: Offers;
  isNearby?: boolean;
  onSelectPoint: (offer: Offer | null) => void;
};


export default function NearbyOffers({ offers, isNearby, onSelectPoint }: NearbyOffersProps): React.ReactElement {
  const nearbyOffers = offers.slice(0, NEARBY_OFFERS_COUNT);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list" data-testid="nearbyListElem">
        <OffersList offers={ nearbyOffers } isNearby={ isNearby } onSelectPoint={ onSelectPoint }/>
      </div>
    </section>
  );
}
