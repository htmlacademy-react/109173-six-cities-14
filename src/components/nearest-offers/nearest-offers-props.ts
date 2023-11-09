import { Offer, OffersProps } from '../../types/offer';

export type NearestOffersProps = {
  onSelectPoint: (offer: Offer | null) => void;
} & Pick<OffersProps, 'offers'>;
