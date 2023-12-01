import { render, screen } from '@testing-library/react';
import { getOffersByCities } from '../../utils/common';
import { makeMockOffer } from '../../utils/mock';
import FavoriteLocation from './favorite-location';

describe('[Component Favorite-location]:', () => {
  it('Should render correct', () => {
    const city = 'Amsterdam';
    const offers = getOffersByCities([ makeMockOffer() ]);
    const component = <FavoriteLocation key={ city } city={ city } offers={ offers.get(city) } />;
    const favoritePlacesElem = 'favoritePlacesElem';

    render(component);
    const cityName = screen.getByText(city);
    const favoritePalces = screen.getByTestId(favoritePlacesElem);

    expect(cityName).toBeInTheDocument();
    expect(favoritePalces).toBeInTheDocument();
  });
});
