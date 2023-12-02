import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('[Component Footer]:', () => {
  it('Should render correct', () => {
    const FooterElem = {
      CONTAINER: 'footerElem',
      IMG: 'footerLogoElem'
    };
    const component = <Footer />;

    render(component);
    const ExpectElem = {
      CONTAINER: screen.getByTestId(FooterElem.CONTAINER),
      IMG: screen.getByTestId(FooterElem.IMG),
    };

    expect(ExpectElem.CONTAINER).toBeInTheDocument();
    expect(ExpectElem.IMG).toBeInTheDocument();
  });
});
