import { render, screen } from '@testing-library/react';

import { cities } from '../../const';
import CitiesList from './cities-list';
import { withMockStore } from '../../utils/mock-components';
import { makeMockStore } from '../../utils/mock';

describe('[Component: Cities-list:]', () => {
  it('Should render correct', () => {
    const citiesListContainerId = 'citiesListElement';
    const citiesListItemId = 'citiesItemElement';
    const initialMockState = makeMockStore();
    const component = withMockStore(<CitiesList />, initialMockState);

    render(component);
    const citiesListContainer = screen.getByTestId(citiesListContainerId);
    const citiesListItems = screen.getAllByTestId(citiesListItemId);

    // console.log('TEST: ', citiesListContainer);

    expect(citiesListContainer).toBeInTheDocument();
    expect(citiesListItems.length).toBe(cities.length);
  });
});
