import { useState } from 'react';
import { Offers } from '../types/offer';
import { SortType } from '../components/sort/sort';

const DEFAULT_SORT = 'POPULAR';

type ResultSortOffers = [
  Offers,
  currentSort: string,
  (selectedSort: string) => void
];

function sortOffers(offers: Offers, sortType: string): Offers {
  const offersCopy = offers.slice();

  switch(sortType) {
    case SortType.POPULAR: {
      return offers;
      break;
    }
    case SortType.LOW_TO_HIGH: {
      offersCopy.sort((offerA, offerB) => offerA.price - offerB.price);
      break;
    }
    case SortType.HIGH_TO_LOW: {
      offersCopy.sort((offerA, offerB) => offerB.price - offerA.price);
      break;
    }
    case SortType.TOP: {
      offersCopy.sort((offerA, offerB) => offerB.rating - offerA.rating);
      break;
    }
  }

  return offersCopy;
}

export default function useSortOffers(offers: Offers): ResultSortOffers {
  const [currentSort, setCurrentSort] = useState(DEFAULT_SORT);

  function handleSortChange(selectedSort: string) {
    if(selectedSort && selectedSort !== currentSort) {
      setCurrentSort(selectedSort);
    }
  }

  const sortedOffers = sortOffers(offers, currentSort);

  return [sortedOffers, currentSort, handleSortChange];
}
