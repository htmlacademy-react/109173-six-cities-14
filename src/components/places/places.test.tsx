import { render, screen } from '@testing-library/react';
import Places from './places';
import { widthHistoryStore } from '../../utils/mock-components';
import { makeMockOffer } from '../../utils/mock';

describe('[Component Places]:', () => {
  it('Should render correct', () => {
    const offers = [ makeMockOffer() ];
    const onSelectPoint = vi.fn();
    const placesTitleTextElem = 'Places';
    const placesFoundTextElem = /1 place to stay in Paris/i;
    const component = widthHistoryStore(<Places offers={ offers } onSelectPoint={ onSelectPoint } />);

    render(component);
    const placesTitle = screen.getByText(placesTitleTextElem);
    const placesFoundText = screen.getByText(placesFoundTextElem);

    expect(placesTitle).toBeInTheDocument();
    expect(placesFoundText).toBeInTheDocument();
  });
});
