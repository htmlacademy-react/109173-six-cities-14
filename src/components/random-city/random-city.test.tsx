import { render, screen } from '@testing-library/react';
import RandomCity from './random-city';
import { widthHistoryStore, withMockHistory, withMockStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';

describe('[Component ]:', () => {
  it('Should render correct', () => {
    const randomCityId = 'randomCityElem';

    const { withStoreComponent } = widthHistoryStore(<RandomCity />);

    render(withStoreComponent);
    const expectElem = screen.getByTestId(randomCityId);

    expect(expectElem).toBeInTheDocument();
  });

  it('Should call "handleCityClick"', async () => {
    const user = userEvent.setup();
    const randomCityLinkId = 'randomCityLinkElem';
    const handleCityClick = vi.fn();

    const { withStoreComponent } = widthHistoryStore(<RandomCity />);

    render(withStoreComponent);
    const expectElem = screen.getByTestId(randomCityLinkId);
    expectElem.addEventListener('click', handleCityClick);
    await user.click(expectElem);
    expectElem.removeEventListener('click', handleCityClick);

    expect(handleCityClick).toBeCalled();
  });

  it('Should dispatch "CITY/setCityAction" and redirect to Main page', async () => {
    const user = userEvent.setup();
    const cityName = 'Test city name';
    const randomCityLinkId = 'randomCityLinkElem';
    const ecpectedAction = 'CITY/setCityAction';
    const initialMockHistory = createMemoryHistory();
    const preparedComponent = withMockHistory(<RandomCity city={ cityName }/>);
    const { withStoreComponent, store } = withMockStore(preparedComponent);

    render(withStoreComponent);
    const randomCityLink = screen.getByTestId(randomCityLinkId);
    await user.click(randomCityLink);
    const action = store.getActions().at(0);

    expect(action?.type).toBe(ecpectedAction);
    expect(initialMockHistory.location.pathname).toBe(AppRoute.MAIN);
  });
});
