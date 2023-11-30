import { render, screen } from '@testing-library/react';
import { makeMockOffer } from '../../utils/mock';
import { widthHistoryStore } from '../../utils/mock-components';
import CardPlace from './card-place';

describe('[Component: Card-place:]', () => {
  it('Should render correct', () => {
    const mockOffer = makeMockOffer();
    const CardPlaceElem = {
      CONTAINER: 'cardPlaceElem',
      IMG: 'cardPlaceImgElem',
      PRICE: 'cardPlacePriceElem',
      RATING: 'cardPlaceRatingElem',
      NAME: 'cardPlaceNameElem',
      TYPE: 'cardPlaceTypeElem',
    };
    const component = widthHistoryStore(<CardPlace offerItem={ mockOffer } />);

    screen.debug();
    render(component);
    const ExpectElem = {
      CONTAINER: screen.getByTestId(CardPlaceElem.CONTAINER),
      IMG: screen.getByTestId(CardPlaceElem.IMG),
      PRICE: screen.getByTestId(CardPlaceElem.PRICE),
      RATING: screen.getByTestId(CardPlaceElem.RATING),
      NAME: screen.getByTestId(CardPlaceElem.NAME),
      TYPE: screen.getByTestId(CardPlaceElem.TYPE),
    };

    expect(ExpectElem.CONTAINER).toBeInTheDocument();
    expect(ExpectElem.IMG).toBeInTheDocument();
    expect(ExpectElem.PRICE).toBeInTheDocument();
    expect(ExpectElem.RATING).toBeInTheDocument();
    expect(ExpectElem.NAME).toBeInTheDocument();
    expect(ExpectElem.TYPE).toBeInTheDocument();
  });
});
