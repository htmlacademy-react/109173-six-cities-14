import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchNeabyOffers } from '../store/api-action';
import { getNearby } from '../store/slices/offer-item-data-process/selectors';

type UseNearbyOfferProps = {
  offerId: string;
};

export default function useNearbyOffer({ offerId }: UseNearbyOfferProps) {
  const dispatch = useAppDispatch();
  const nearbyOffers = useAppSelector(getNearby);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchNeabyOffers(offerId));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, offerId]);

  return nearbyOffers;
}
