import { render, screen } from '@testing-library/react';
import { makeMockStoreState } from '../../utils/mock';
import { withMockStore } from '../../utils/mock-components';
import CitiesItem from './cities-item';
import userEvent from '@testing-library/user-event';

describe('[Component Cities-item]:', () => {
  let initialMockState: ReturnType<typeof makeMockStoreState>;
  const city = 'Amsterdam';
  const mockOnSelectCity = vi.fn();

  beforeEach(() => {
    initialMockState = makeMockStoreState();
  });

  it('Should render correct', () => {
    const citiesListItemId = 'citiesItemElement';
    const component = withMockStore(<CitiesItem city={ city } onSelectCity={ mockOnSelectCity }/>, initialMockState);

    render(component);
    const citiesListItem = screen.getAllByTestId(citiesListItemId);

    expect(citiesListItem.length).toBe(1);
  });

  it('Should have className tabs__item tabs__item--active when isSelectedCity = true;', () => {
    const expectedClassName = 'tabs__item--active';
    const citiesListItemLinkId = 'citiesItemLinkElement';
    const component = withMockStore(<CitiesItem city={ city } isSelectedCity onSelectCity={ mockOnSelectCity }/>, initialMockState);

    render(component);

    const citiesListItem = screen.getByTestId(citiesListItemLinkId);

    expect(citiesListItem).toHaveClass(expectedClassName);
  });

  it('Should correct react onSelectCity', async () => {
    const user = userEvent.setup();
    const component = withMockStore(<CitiesItem city={ city } onSelectCity={ mockOnSelectCity }/>, initialMockState);

    render(component);

    const citiesItem = screen.getByTestId('citiesItemElement');
    await user.click(citiesItem);

    expect(mockOnSelectCity).toBeCalled();
  });
});
