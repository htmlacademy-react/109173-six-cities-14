import { render, screen } from '@testing-library/react';
import NearbyOffers from './nearby-offers';
import { makeMockOffer } from '../../utils/mock';
import { widthHistoryStore } from '../../utils/mock-components';

describe('[Component Nearby-Offers]:', () => {
  it('Should render correct', () => {
    const offers = [ makeMockOffer() ];
    const onSelectPoint = vi.fn();
    const nearbyTitleText = 'Other places in the neighbourhood';
    const nearbyListElem = 'nearbyListElem';
    const component = widthHistoryStore(<NearbyOffers offers={ offers } onSelectPoint={ onSelectPoint }/>);

    render(component);
    const nearbyTitle = screen.getByText(nearbyTitleText);
    const nearbyList = screen.getByTestId(nearbyListElem);

    expect(nearbyTitle).toBeInTheDocument();
    expect(nearbyList).toBeInTheDocument();
  });
});
