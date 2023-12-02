import { NEARBY_OFFERS_COUNT } from '../../const';
import { NearbyOffersProps } from './nearby-offers-props';
import OffersList from '../offers-list/offers-list';

export default function NearbyOffers({ offers, onSelectPoint }: NearbyOffersProps): React.ReactElement {
  const nearbyOffers = offers.slice(0, NEARBY_OFFERS_COUNT);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list" data-testid="nearbyListElem">
        <OffersList offers={ nearbyOffers } onSelectPoint={ onSelectPoint }/>
      </div>
    </section>
  );
}
