import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import App from './app';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeMockOffer, makeMockStoreState } from '../../utils/mock';

describe('[Component App]:', () => {
  let mockHistory: MemoryHistory;
  let preparedComponent: React.ReactElement;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    preparedComponent = withMockHistory(<App />, mockHistory);
  });

  describe('[Main page]:', () => {
    it('Should render "Spinner" when offers are not loaded yet', () => {
      const component = withMockStore(preparedComponent, {
        OFFERS: {
          offers: [],
          isOffersLoading: true
        }
      });
      const spinnerId = 'spinnerElem';
      mockHistory.push(AppRoute.MAIN);

      render(component);

      expect(screen.getByTestId(spinnerId)).toBeInTheDocument();
    });

    it('Should not render "Spinner" when offers are loaded', () => {
      const initialMockStoreState = makeMockStoreState({
        OFFERS: {
          offers: [],
          isOffersLoading: false
        }
      });
      const component = withMockStore(preparedComponent, initialMockStoreState);
      const spinnerId = 'spinnerElem';
      mockHistory.push(AppRoute.MAIN);

      render(component);

      expect(screen.queryByTestId(spinnerId)).not.toBeInTheDocument();
    });

    it('Should render "Main page" when user navigate to "/"', () => {
      const offer = makeMockOffer();
      offer.city.name = 'Paris';
      const initialMockStoreState = makeMockStoreState({
        OFFERS: {
          offers: [ offer ],
          isOffersLoading: false
        }
      });
      const component = withMockStore(preparedComponent, initialMockStoreState);
      const citiesListId = 'citiesListElement';
      const placesId = 'placesElem';
      const mapId = 'mapContainerElem';
      mockHistory.push(AppRoute.MAIN);

      render(component);

      expect(screen.getByTestId(citiesListId)).toBeInTheDocument();
      expect(screen.getByTestId(placesId)).toBeInTheDocument();
      expect(screen.getByTestId(mapId)).toBeInTheDocument();
    });

    it('Should not render "Main Epmty" when offers are empty', () => {
      const initialMockStoreState = makeMockStoreState({
        OFFERS: {
          offers: [],
          isOffersLoading: false
        }
      });
      const component = withMockStore(preparedComponent, initialMockStoreState);
      const citiesListId = 'citiesListElement';
      const expectedStatusText = 'No places to stay available';
      const expectedDescriptionText = 'We could not find any property available at the moment in Paris';
      mockHistory.push(AppRoute.MAIN);

      render(component);

      expect(screen.getByTestId(citiesListId)).toBeInTheDocument();
      expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
      expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
    });
  });

  describe('[Favorites page]:', () => {
    it('Should render "Favorites-empty" page when user is logged in and dont have Favorite offers', () => {
      const initialMockStoreState = makeMockStoreState({
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
          userInfo: null,
        }
      });
      const component = withMockStore(preparedComponent, initialMockStoreState);
      const expectedTitleText = 'Favorites (empty)';
      const expectedStatusText = 'Nothing yet saved.';
      const expectedDescriptionText = 'Save properties to narrow down search or plan your future trips.';
      mockHistory.push(AppRoute.FAVORITES);

      render(component);

      expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
      expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
      expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
    });

    it('Should render "Favorites" page when user is logged in and have some Favorite offers', () => {
      const offerOne = makeMockOffer();
      const offerTwo = makeMockOffer();
      const initialMockStoreState = makeMockStoreState({
        USER: {
          authorizationStatus: AuthorizationStatus.AUTH,
          userInfo: null,
        },
        FAVORITES: {
          favorites: [ offerOne, offerTwo ],
        }
      });
      const component = withMockStore(preparedComponent, initialMockStoreState);
      const expectedFavoritesCount = 2;
      const favoritesItemId = 'favoritesItemElem';
      const expectedTitleText = 'Saved listing';
      const notExpectedTitleText = 'Favorites (empty)';
      mockHistory.push(AppRoute.FAVORITES);

      render(component);
      const favoritesItems = screen.getAllByTestId(favoritesItemId);

      expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
      expect(favoritesItems.length).toBe(expectedFavoritesCount);
      expect(screen.queryByText(notExpectedTitleText)).not.toBeInTheDocument();
    });
  });

  describe('[Page 404]:', () => {
    it('Should render "Page 404" when user navigate to Unexistable page', () => {
      const initialMockStoreState = makeMockStoreState();
      const component = withMockStore(preparedComponent, initialMockStoreState);
      const expectedTitleText = '404 Requested page Not Found';
      mockHistory.push('/some/unknown/page');

      render(component);

      expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    });
  });
});
