import { Offer } from '../../types/offer';

export type CardPlaceProps = {
  offerItem: Offer;
  onSelectCard?: () => void;
}
