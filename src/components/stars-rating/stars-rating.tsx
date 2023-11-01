import { getRatingPercent } from '../../utils/common';

type StarsRatingProp = {
  rating: number;
};

export default function StarsRating({ rating }: StarsRatingProp): React.ReactElement {
  const currentRatingPercent = getRatingPercent(rating);

  return (
    <>
      <span style={{ width: currentRatingPercent, }}></span>
      <span className="visually-hidden">Rating</span>
    </>
  );
}
