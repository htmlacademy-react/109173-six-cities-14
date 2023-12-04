import { useAppSelector } from '../../hooks';
import useSortOffers from '../../hooks/useSortOffers';
import { getCity } from '../../store/slices/city-process/selectors';

import { getRightPluralForm } from '../../utils/common';
import OffersList from '../offers-list/offers-list';
import Sort from '../sort/sort';

import { Offer, Offers } from '../../types/offer';

export type PlacesProps = {
  offers: Offers;
  onSelectPoint: (offer: Offer | null) => void;
};

export default function Places({ offers, onSelectPoint }: PlacesProps): React.ReactNode {
  const currentCity = useAppSelector(getCity);
  const [sortedOffers, currentSort, handleSortChange] = useSortOffers(offers);

  return (
    <section className="cities__places places" data-testid="placesElem">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{ offers.length } { getRightPluralForm('place', offers.length) } to stay in { currentCity }</b>

      <Sort currentSort={ currentSort } onSortChange={ handleSortChange } />

      <div className="cities__places-list places__list tabs__content">
        <OffersList offers={ sortedOffers } onSelectPoint={ onSelectPoint } />
      </div>
    </section>
  );
}
