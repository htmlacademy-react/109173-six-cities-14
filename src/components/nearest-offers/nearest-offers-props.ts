import { Offer, OffersProps } from '../../types/offer';

export type NearestOffersProps = {
  offerID: number;
  onSelectPoint: (offer: Offer | null) => void;
} & Pick<OffersProps, 'offers'>;
