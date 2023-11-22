import { getRightPluralForm } from '../../utils/common';

import OffersList from '../offers-list/offers-list';
import Sort from '../sort/sort';

import { PlacesProps } from '../../pages/main/main-props';
import { useAppSelector } from '../../hooks';
import useSortOffers from '../../hooks/useSortOffers';
import { getCity } from '../../store/slices/city-process/selectors';

export default function Places({ offers, onSelectPoint }: PlacesProps): React.ReactNode {
  const currentCity = useAppSelector(getCity);
  const [sortedOffers, handleSortChange] = useSortOffers(offers);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{ offers.length } { getRightPluralForm('place', offers.length) } to stay in { currentCity }</b>

      <Sort onSortChange={ handleSortChange } />

      <div className="cities__places-list places__list tabs__content">
        <OffersList offers={ sortedOffers } onSelectPoint={ onSelectPoint } />
      </div>
    </section>
  );
}
