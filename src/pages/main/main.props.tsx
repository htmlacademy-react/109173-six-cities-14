export type MainProps = {
  offersCount: number;
  isMainEmpty?: boolean;
};

export type LocationItemProps = {
  itemName: string;
};

type LocationProps = {
  'latitude': number;
  'longitude': number;
  'zoom': number;
};

type CityProps = {
  name: string;
  location: LocationProps;
};

type HostProps = {
  'id': number;
  'name': string;
  'isPro': boolean;
  'avatarUrl': string;
}

export type OfferProps = {
  'city': CityProps;
  'previewImage': string;
  'images': string[];
  'title': string;
  'isFavorite': boolean;
  'isPremium': boolean;
  'rating': number;
  'type': string;
  'bedrooms': number;
  'maxAdults': number;
  'price': number;
  'goods': string[];
  'host': HostProps;
  'description': string;
  'location': LocationProps;
  'id': number;
};
