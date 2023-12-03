import { render, screen } from '@testing-library/react';
import { makeMockOffer } from '../../utils/mock';
import FavoriteCards from './favorite-cards';
import { getOffersByCities } from '../../utils/common';
import { widthHistoryStore } from '../../utils/mock-components';
import { Offers } from '../../types/offer';

describe('[Component Favorite-cards:]:', () => {
  it('Should render correct', () => {
    const offers: Map<string, Offers> = getOffersByCities([ makeMockOffer() ]);
    const FavoritesElem = {
      CONTAINER: 'favoritesElem',
      LIST: 'favoritesElem'
    };
    const { withStoreComponent } = widthHistoryStore(<FavoriteCards offers={ offers } />);

    render(withStoreComponent);
    const ExpectElem = {
      CONTAINER: screen.getByTestId(FavoritesElem.CONTAINER),
      LIST: screen.getByTestId(FavoritesElem.LIST),
    };

    expect(ExpectElem.CONTAINER).toBeInTheDocument();
    expect(ExpectElem.LIST).toBeInTheDocument();
  });
});
