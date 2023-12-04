import { render, screen } from '@testing-library/react';
import Header from './header';
import { widthHistoryStore } from '../../utils/mock-components';

describe('[Component Footer]:', () => {
  it('Should render correct', () => {
    const HeaderElem = {
      CONTAINER: 'headerElem',
      IMG: 'headerLogoElem'
    };
    const { withStoreComponent } = widthHistoryStore(<Header />);

    render(withStoreComponent);
    const ExpectElem = {
      CONTAINER: screen.getByTestId(HeaderElem.CONTAINER),
      IMG: screen.getByTestId(HeaderElem.IMG),
    };

    expect(ExpectElem.CONTAINER).toBeInTheDocument();
    expect(ExpectElem.IMG).toBeInTheDocument();
  });
});
