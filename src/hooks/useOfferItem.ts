import { useEffect } from 'react';
import { fetchOfferItemAction } from '../store/api-action';
import { useAppDispatch, useAppSelector } from '.';
import { getOffer } from '../store/slices/offer-item-data-process/selectors';

type UseOfferItemProps = {
  offerId: string;
}

export default function useOfferItem({ offerId }: UseOfferItemProps) {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getOffer);

  useEffect(() => {
    let isMounted = true;

    if(isMounted && currentOffer?.id !== offerId) {
      dispatch(fetchOfferItemAction({ offerId }));
    }

    return () => {
      isMounted = false;
    };
  });

  return currentOffer;
}
