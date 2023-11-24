import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchOfferItemAction } from '../store/api-action';
import { getOffer } from '../store/slices/offer-item-data-process/selectors';

type UseOfferItemProps = {
  offerId: string;
}

export default function useOfferItem({ offerId }: UseOfferItemProps) {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getOffer);

  useEffect(() => {
    let isMounted = true;

    if(isMounted && offerId && !currentOffer) {
      dispatch(fetchOfferItemAction({ offerId }));
    }

    return () => {
      isMounted = false;
    };
  });

  return currentOffer;
}
