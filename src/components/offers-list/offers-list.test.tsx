import { render, screen } from '@testing-library/react';
import { makeMockOffer } from '../../utils/mock';
import OffersList from './offers-list';
import { widthHistoryStore } from '../../utils/mock-components';

describe('[Component Offers-list]:', () => {
  it('Should render correct', () => {
    const offers = [ makeMockOffer(), makeMockOffer() ];
    const onSelectPoint = vi.fn();
    const cardPlaceId = 'cardPlaceElem';
    const expectedElemsCount = 2;
    const { withStoreComponent } = widthHistoryStore(<OffersList offers={ offers } onSelectPoint={ onSelectPoint } />);

    render(withStoreComponent);
    const cardPlace = screen.getAllByTestId(cardPlaceId);

    expect(cardPlace.at(0)).toBeInTheDocument();
    expect(cardPlace.at(1)).toBeInTheDocument();
    expect(cardPlace.length).toBe(expectedElemsCount);
  });
});
