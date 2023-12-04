import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { withStoreComponent } = widthHistoryStore(<CardPlace offerItem={ mockOffer } />);

    render(withStoreComponent);
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

  it('Should correct react onMouseEnter/onMouseLeave', async () => {
    const user = userEvent.setup();
    const mockOffer = makeMockOffer();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();
    const { withStoreComponent } = widthHistoryStore(<CardPlace offerItem={ mockOffer } onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave} />);

    render(withStoreComponent);
    const cardPlace = screen.getByTestId('cardPlaceElem');
    await user.hover(cardPlace);
    await user.unhover(cardPlace);

    expect(onMouseEnter).toBeCalled();
    expect(onMouseLeave).toBeCalled();
  });
});
