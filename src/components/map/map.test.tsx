import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeMockOffer } from '../../utils/mock';
import { withMockHistory } from '../../utils/mock-components';

describe('[Component Map]:', () => {
  it('Should render correct', () => {
    const offer = makeMockOffer();
    const offers = [ offer ];
    const mapContainerElem = 'mapContainerElem';
    const component = withMockHistory(<Map offers={ offers } selectedPoint={ offer } />);

    render(component);
    const mapContainer = screen.getByTestId(mapContainerElem);

    expect(mapContainer).toBeInTheDocument();
  });
});
