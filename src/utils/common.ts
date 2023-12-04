import { DateFormat, months } from '../const';
import { Offers } from '../types/offer';

type PadedNumResult = string | number;
type DateFormatType = typeof DateFormat[keyof typeof DateFormat];
type MappedOfers = Map<string, Offers>;

export function getRatingPercent(rating: number) {
  return (100 / 5) * rating;
}

export function getPaddedNum(num: number): PadedNumResult {
  return (num < 10) ? `0${num}` : num;
}

export function getMonthName(monthNum: number): string {
  return months[monthNum];
}

export function getFormattedDate(date: Date, format: DateFormatType): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  let formattedDate: string | number = Date.parse(String(date));

  switch(format) {
    case DateFormat.DATE_TIME: {
      formattedDate = `${year}-${getPaddedNum(month)}-${getPaddedNum(day)}`;
      break;
    }

    case DateFormat.MONTH_YEAR: {
      formattedDate = `${getMonthName(month)} ${year}`;
      break;
    }
  }

  return String(formattedDate);
}

export function getRightPluralForm(phrase: string, itemsCount: number) {
  return (itemsCount <= 1) ? phrase : `${phrase}s`;
}

export function getOffersByCities(offers: Offers) {
  const offersByCities: MappedOfers = new Map();

  offers.map((offer) => {
    const city = offer.city.name;

    if(offersByCities.has(city)) {
      const cityOffers = offersByCities.get(city);

      if(cityOffers) {
        cityOffers?.push(offer);

        offersByCities.set(city, cityOffers);
      }
    } else {
      offersByCities.set(city, [ offer ]);
    }
  });

  return offersByCities;
}

export function getStarTextByNum(number: number): string {
  const ratings = ['perfect', 'good', 'not bad', 'badly', 'terribly'];
  const index = number - 1;

  return ratings.at(index) || '';
}

export function getRandomInRange(min: number = 0, max: number = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
