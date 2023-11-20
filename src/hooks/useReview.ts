import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchComments } from '../store/api-action';

type UseReviewProps = {
  offerID: string;
};

export default function useReview({ offerID }: UseReviewProps) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comments);

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
