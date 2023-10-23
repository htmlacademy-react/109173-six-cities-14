import { Offer } from '../../types/offer';

export type MainProps = {
  locations: string[];
  offers: Offer[];
  offersCount: number;
  isMainEmpty?: boolean;
};

export type PlacesProps = Omit<MainProps, 'locations'>;

export type LocationItemProps = {
  itemName: string;
};
