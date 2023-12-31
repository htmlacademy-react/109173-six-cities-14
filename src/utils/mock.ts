import { address, datatype, date, image, internet, lorem } from 'faker';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';

import { State } from '../types/state';

import { AuthorizationStatus, DEFAULT_CITY, Namespace, SEND_DATA_STATUS } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

export function setMockBrowserHistory() {
  vi.mock('../browser-history', () => ({
    default: {
      location: { pathname: ''},
      push(path: string) {
        this.location.pathname = path;
      },
      back() {
        this.location.pathname = '';
      }
    }
  }));
}

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


export function makeMockStoreState(initialState?: Partial<State>) {
  const mockStore = {
    [Namespace.CITY]: {
      city: DEFAULT_CITY,
    },
    [Namespace.FAVORITES]: {
      favorites: [],
    },
    [Namespace.OFFER]: {
      offer: null,
      nearbyOffers: [],
      comments: [],
      isCommentsLoaded: false,
      addCommentStatus: SEND_DATA_STATUS.NONE,
    },
    [Namespace.OFFERS]: {
      offers: [],
      isOffersLoading: false,
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userInfo: null,
    },
    ...initialState ?? {}
  };

  return mockStore;
}

export function makeMockUser() {
  return {
    id: datatype.number(1000),
    email: internet.email(),
    isPro: datatype.boolean(),
    name: lorem.words(3),
    avatarUrl : image.imageUrl(),
    token: crypto.randomUUID(),
  };
}

export function makeMockLocation() {
  return {
    latitude: datatype.float(100),
    longitude: datatype.float(100),
    zoom: datatype.number(10)
  };
}

export function makeMockCity() {
  return {
    name: address.cityName(),
    location: makeMockLocation(),
  };
}

export function makeMockOffer() {
  return {
    city: makeMockCity(),
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
    host: makeMockUser(),
    description: lorem.words(60),
    location: makeMockLocation(),
    id: crypto.randomUUID(),
  };
}

export function makeMockComment() {
  return {
    id: datatype.number(1000),
    user: makeMockUser(),
    rating: datatype.number(5),
    comment: lorem.words(50),
    date: String(date.recent()),
  };
}
