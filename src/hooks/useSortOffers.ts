import { useState } from 'react';
import { Offers } from '../types/offer';
import { SortType } from '../components/sort/sort';
import { useAppSelector } from '.';
import { getOffers } from '../store/slices/offers-data-process/selectors';

const DEFAULT_SORT = 'POPULAR';

type ResultSortOffers = [
  Offers,
  (selectedSort: string) => void
];

function sortOffers(offers: Offers, sortType: string, baseOffersOrder: Offers): Offers {
  switch(sortType) {
    case SortType.POPULAR: {
      return baseOffersOrder;
      break;
    }
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

export default function useSortOffers(offers: Offers): ResultSortOffers {
  const baseOffersOrder = useAppSelector(getOffers);
  const [currentSort, setCurrentSort] = useState(DEFAULT_SORT);

  function handleSortChange(selectedSort: string) {
    if(selectedSort && selectedSort !== currentSort) {
      setCurrentSort(selectedSort);
    }
  }

  const sortedOffers = sortOffers(offers, currentSort, baseOffersOrder);

  return [sortedOffers, handleSortChange];
}
