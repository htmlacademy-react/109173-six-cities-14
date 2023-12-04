import { Location } from './location';
import { City } from './city';
import { Host } from './host';
import { Comments } from './comment';

type Images = string[];
type Goods = string[];

export type Offer = {
  city: City;
  previewImage: string;
  images: Images;
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods;
  host: Host;
  description: string;
  location: Location;
  id: string;
};

export type Offers = Offer[];

export type OffersProps = {
  comments: Comments;
}
