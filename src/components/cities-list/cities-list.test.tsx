import { render, screen } from '@testing-library/react';

import { cities } from '../../const';
import CitiesList from './cities-list';
import { widthHistoryStore } from '../../utils/mock-components';

describe('[Component: Cities-list:]', () => {
  it('Should render correct', () => {
    const citiesListContainerId = 'citiesListElement';
    const citiesListItemId = 'citiesItemElement';
    const component = widthHistoryStore(<CitiesList />);

    render(component);
    const citiesListContainer = screen.getByTestId(citiesListContainerId);
    const citiesListItems = screen.getAllByTestId(citiesListItemId);

    expect(citiesListContainer).toBeInTheDocument();
    expect(citiesListItems.length).toBe(cities.length);
  });
});
