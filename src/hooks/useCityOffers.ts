import { useAppSelector } from '.';
import { getCity } from '../store/slices/city-process/selectors';
import { getOffers } from '../store/slices/offers-data-process/selectors';

import { filterOffersByCity } from '../utils/offer';

export default function useCityOffers() {
  const currentCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const cityOffers = filterOffersByCity(currentCity, offers);

  return cityOffers;
}
