import { useState } from 'react';
import { Offers } from '../types/offer';
import { SortType } from '../components/sort/sort';

const DEFAULT_SORT = 'POPULAR';

type ResultSortOFfers = [
  Offers,
  (selectedSort: string) => void
];


function sortOffers(offers: Offers, sortType: string): Offers {
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

export default function useSortOffers(offers: Offers): ResultSortOFfers {
  const [currentSort, setCurrentSort] = useState(DEFAULT_SORT);

  function handleSortChange(selectedSort: string) {
    if(selectedSort && selectedSort !== currentSort) {
      setCurrentSort(selectedSort);
    }
  }

  const sortedOffers = sortOffers(offers, currentSort);

  return [sortedOffers, handleSortChange];
}
