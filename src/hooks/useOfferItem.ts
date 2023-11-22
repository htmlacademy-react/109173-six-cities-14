import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchOfferItemAction } from '../store/api-action';
import { getOffer } from '../store/slices/offer-item-data-process/selectors';

type UseOfferItemProps = {
  offerID: string;
}

export default function useOfferItem({ offerID }: UseOfferItemProps) {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getOffer);

  useEffect(() => {
    let isMounted = true;

    if(isMounted && offerID && !currentOffer) {
      dispatch(fetchOfferItemAction({ offerID }));
    }

    return () => {
      isMounted = false;
    };
  });

  return currentOffer;
}
