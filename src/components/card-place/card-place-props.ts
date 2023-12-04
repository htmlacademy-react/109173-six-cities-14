import { Offer } from '../../types/offer';

export type CardPlaceProps = {
  offerItem: Offer;
  isNearby?: boolean;
  isCompact?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
