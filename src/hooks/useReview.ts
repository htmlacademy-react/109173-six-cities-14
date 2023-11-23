import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchComments } from '../store/api-action';
import { getComments } from '../store/slices/offer-item-data-process/selectors';

type UseReviewProps = {
  offerID: string;
};

export default function useReview({ offerID }: UseReviewProps) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);

  useEffect(() => {
    let isMounted = true;

    if(isMounted && offerID) {
      dispatch(fetchComments({ offerID }));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, offerID]);

  return comments;
}
