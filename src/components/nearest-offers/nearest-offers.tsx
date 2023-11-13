import { NEAREST_OFFERS_COUNT } from '../../const';
import { NearestOffersProps } from './nearest-offers-props';
import OffersList from '../offers-list/offers-list';

export default function NearestOffers({ offerID, offers, onSelectPoint }: NearestOffersProps): React.ReactElement {
  const filteredOffers = offers.filter((offer) => offer.id !== offerID); // Исключаем текущий оффер из ближайших
  const nearestOffers = filteredOffers.slice(0, NEAREST_OFFERS_COUNT); // Предложения неподалеку (берем всего 3 штуки)
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList offers={ nearestOffers } onSelectPoint={ onSelectPoint }/>
      </div>
    </section>
  );
}
