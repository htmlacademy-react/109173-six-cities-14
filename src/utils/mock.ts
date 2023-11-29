import { address, datatype, date, image, internet, lorem } from 'faker';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';

import { State } from '../types/state';
import { Namespace } from '../types/namespace';

import { AuthorizationStatus, DEFAULT_CITY, NAMESPACE, SEND_DATA_STATUS } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

export function extractActionsTypes(actions: Action<string>[]) {
  return actions.map((action) => action.type);
}

export function getFakeStore() {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  return { axios, mockAxiosAdapter, middleware, mockStoreCreator };
}


export function makeMockStore(initialState?: Partial<State>, returnNamespace?: Namespace) {
  const mockStore = {
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

  // if(returnNamespace && returnNamespace in mockStore) {
  //   return mockStore[returnNamespace];
  // }

  return mockStore;
}

export function makeFakeUser() {
  return {
    id: datatype.number(1000),
    email: internet.email(),
    isPro: datatype.boolean(),
    name: lorem.words(3),
    avatarUrl : image.imageUrl(),
    token: crypto.randomUUID(),
  };
}

export function makeFakeLocation() {
  return {
    latitude: datatype.float(100),
    longitude: datatype.float(100),
    zoom: datatype.number(10)
  };
}

export function makeFakeOffer() {
  return {
    city: {
      name: address.cityName(),
      location: makeFakeLocation(),
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
    host: makeFakeUser(),
    description: lorem.words(60),
    location: makeFakeLocation(),
    id: crypto.randomUUID(),
  };
}

export function makeFakeComment() {
  return {
    id: datatype.number(1000),
    user: makeFakeUser(),
    rating: datatype.number(5),
    comment: lorem.words(50),
    date: String(date.recent()),
  };
}
