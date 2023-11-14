import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchNeabyOffers } from '../store/api-action';

type UseNearbyOfferProps = {
  offerID: string;
};

export default function useNearbyOffer({ offerID }: UseNearbyOfferProps) {
  const dispatch = useAppDispatch();
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);

  useEffect(() => {
    dispatch(fetchNeabyOffers({ offerID }));
  }, [dispatch, offerID]);

  return nearbyOffers;
}
