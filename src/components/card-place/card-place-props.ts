import { Offer } from '../../types/offer';

export type CardPlaceProps = {
  offerItem: Offer;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
