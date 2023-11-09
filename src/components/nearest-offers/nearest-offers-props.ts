import { OffersProps } from '../../pages/offers-item/offers-item-props';
import { Offer } from '../../types/offer';

export type NearestOffersProps = {
  onSelectPoint: (offer: Offer | null) => void;
} & Pick<OffersProps, 'offers'>;
