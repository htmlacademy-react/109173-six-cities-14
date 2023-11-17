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
    if(offerID) {
      dispatch(fetchComments({ offerID }));
    }
  }, [dispatch, offerID]);

  return comments;
}
