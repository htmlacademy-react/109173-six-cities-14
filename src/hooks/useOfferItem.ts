import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchOfferItemAction } from '../store/api-action';

type UseOfferItemProps = {
  offerID: string;
}

export default function useOfferItem({ offerID }: UseOfferItemProps) {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.offer);

  useEffect(() => {
    if(offerID && !currentOffer) {
      dispatch(fetchOfferItemAction({ offerID }));
    }
  });

  return currentOffer;
}