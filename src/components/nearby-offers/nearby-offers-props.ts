import { Offer, OffersProps } from '../../types/offer';

export type NearbyOffersProps = {
  offerID: string;
  onSelectPoint: (offer: Offer | null) => void;
} & Pick<OffersProps, 'offers'>;
