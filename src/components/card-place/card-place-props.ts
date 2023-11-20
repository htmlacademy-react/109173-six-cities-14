import { Offer } from '../../types/offer';

export type CardPlaceProps = {
  offerItem: Offer;
  isCompact?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
