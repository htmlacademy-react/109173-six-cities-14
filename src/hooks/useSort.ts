import { useEffect, useState } from 'react';
import { Offers } from '../types/offer';
import { SortType } from '../components/sort/sort';

export default function useSort(offers: Offers, sortType: string): Offers {
  const [sortedOffers, setSortedOffers] = useState<Offers>(offers);

  useEffect(() => {
    switch(sortType) {
      case SortType.LOW_TO_HIGH: {
        setSortedOffers(sortedOffers.sort((offerA, offerB) => offerA.price - offerB.price));
        break;
      }
      case SortType.HIGH_TO_LOW: {
        setSortedOffers(sortedOffers.sort((offerA, offerB) => offerB.price - offerA.price));
        break;
      }
      case SortType.TOP: {
        setSortedOffers(sortedOffers.sort((offerA, offerB) => offerB.rating - offerA.rating));
        break;
      }

      default: {
        setSortedOffers(offers);
      }
    }
  }, [offers, sortType, sortedOffers]);

  return sortedOffers;
}
