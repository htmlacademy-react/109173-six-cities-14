import { NEARBY_OFFERS_COUNT } from '../../const';
import { NearbyOffersProps } from './nearby-offers-props';
import OffersList from '../offers-list/offers-list';

export default function NearbyOffers({ offerID, offers, onSelectPoint }: NearbyOffersProps): React.ReactElement {
  const filteredOffers = offers.filter((offer) => offer.id !== offerID); // Исключаем текущий оффер из ближайших
  const nearestOffers = filteredOffers.slice(0, NEARBY_OFFERS_COUNT); // Предложения неподалеку (берем всего 3 штуки)
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={ nearestOffers } onSelectPoint={ onSelectPoint }/>
      </div>
    </section>
  );
}
