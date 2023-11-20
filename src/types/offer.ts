import { Location } from './location';
import { City } from './city';
import { Host } from './host';
import { Comments } from './comment';

export type Offer = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
  id: string;
};

export type Offers = Offer[];

export type OffersProps = {
  comments: Comments;
}
