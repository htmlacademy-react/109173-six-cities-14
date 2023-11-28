import { AuthorizationStatus, DEFAULT_CITY, NAMESPACE, SEND_DATA_STATUS } from '../const';
import { State } from '../types/state';

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
