import { AuthorizationStatus, DEFAULT_CITY, NAMESPACE, SEND_DATA_STATUS } from '../const';
import { State } from '../types/state';
import { address, datatype, image, lorem } from 'faker';

export function makeMockStore(initialState?: Partial<State>) {
  return {
    [NAMESPACE.CITY]: {
      city: DEFAULT_CITY,
    },
    [NAMESPACE.FAVORITES]: {
      favorites: [],
    },
    [NAMESPACE.MAIN]: {/* Something about main */},
    [NAMESPACE.OFFER]: {
      offer: null,
      nearbyOffers: [],
      comments: [],
      isCommentsLoaded: false,
      addCommentStatus: SEND_DATA_STATUS.NONE,
    },
    [NAMESPACE.OFFERS]: {
      offers: [],
      isOffersLoading: false,
    },
    [NAMESPACE.USER]: {
      favorites: [],
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userInfo: null,
    },
    ...initialState ?? {}
  };
}


export function makeFakeOffer() {
  return {
    city: {
      name: address.cityName(),
      location: {
        latitude: datatype.float(100),
        longitude: datatype.float(100),
        zoom: datatype.number(10)
      }
    },
    previewImage: image.imageUrl(),
    images: [],
    title: lorem.words(20),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number(5),
    type: lorem.word(2),
    bedrooms: datatype.number(3),
    maxAdults: datatype.number(5),
    price: datatype.number(500),
    goods: [],
    host: {
      id: datatype.number(1000),
      name: lorem.words(3),
      isPro: datatype.boolean(),
      avatarUrl: image.imageUrl(),
    },
    description: lorem.words(60),
    location: {
      latitude: datatype.float(100),
      longitude: datatype.float(100),
      zoom: datatype.number(10)
    },
    id: crypto.randomUUID(),
  };
}
