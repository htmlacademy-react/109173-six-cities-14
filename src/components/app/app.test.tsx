import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import App from './app';
import { AppRoute } from '../../const';
import { makeMockOffer, makeMockStoreState } from '../../utils/mock';

describe('[Component App]:', () => {
  let mockHistory: MemoryHistory;
  let preparedComponent: React.ReactElement;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    preparedComponent = withMockHistory(<App />, mockHistory);
  });

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
});
