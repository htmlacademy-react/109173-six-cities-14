import { City } from '../types/city';
import { Offers } from '../types/offer';

export function getNearestOffers(currentCity: City, offers: Offers) {
  const nearestOffers = offers.slice().filter((offer) => (currentCity.name === offer.city.name));

  return nearestOffers;
}

export function adaptOffersToPoints(offers: Offers) {
  const points = offers.slice().map((offer) => {
    const {latitude, longitude} = offer.location;

    return {id: offer.id, lat: latitude, long: longitude};
  });

  return points;
}
