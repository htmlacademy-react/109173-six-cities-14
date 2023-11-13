import { City } from '../types/city';
import { Offers } from '../types/offer';

export function getOffersByCity(currentCity: City, offers: Offers) {
  const offersByCity = offers.slice().filter((offer) => (currentCity.name === offer.city.name));

  return offersByCity;
}

export function adaptOffersToPoints(offers: Offers) {
  const points = offers.slice().map((offer) => {
    const {latitude, longitude} = offer.location;

    return {id: offer.id, lat: latitude, long: longitude};
  });

  return points;
}
