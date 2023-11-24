import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchComments } from '../store/api-action';
import { getComments } from '../store/slices/offer-item-data-process/selectors';

type UseReviewProps = {
  offerId: string;
};

export default function useReview({ offerId }: UseReviewProps) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);

  useEffect(() => {
    let isMounted = true;

    if(isMounted && offerId) {
      dispatch(fetchComments({ offerId }));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, offerId]);

  return comments;
}
