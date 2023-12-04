import { getRatingPercent } from '../../utils/common';

type StarsRatingProp = {
  rating: number;
};

export default function StarsRating({ rating }: StarsRatingProp): React.ReactElement {
  const roundedRating = Math.round(rating);
  const currentRatingPercent = `${getRatingPercent(roundedRating)}%`;

  return (
    <>
      <span style={{ width: currentRatingPercent, }} data-testid="starsRatingElem">({ roundedRating })</span>
      <span className="visually-hidden">Rating</span>
    </>
  );
}
