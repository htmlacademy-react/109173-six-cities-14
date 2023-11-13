import { Offers } from '../types/offer';
import { SortType } from '../components/sort/sort';

export default function useSort(offers: Offers, sortType: string): Offers {

  switch(sortType) {
    case SortType.LOW_TO_HIGH: {
      offers.sort((offerA, offerB) => offerA.price - offerB.price);
      break;
    }
    case SortType.HIGH_TO_LOW: {
      offers.sort((offerA, offerB) => offerB.price - offerA.price);
      break;
    }
    case SortType.TOP: {
      offers.sort((offerA, offerB) => offerB.rating - offerA.rating);
      break;
    }
  }

  return offers;
}
