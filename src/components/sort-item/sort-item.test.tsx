import { render, screen } from '@testing-library/react';
import SortItem from './sort-item';

describe('[Component Sort-item]:', () => {
  it('Should render correct', () => {
    const onSort = vi.fn();
    const expectedText = {
      POPULAR: 'Popular',
      LOW_TO_HIGH: 'Price: low to high',
      HIGH_TO_LOW: 'Price: high to low',
      TOP: 'Top rated first'
    };
    const component = <SortItem onSort={ onSort } />;

    render(component);

    expect(screen.getByText(expectedText.POPULAR)).toBeInTheDocument();
    expect(screen.getByText(expectedText.LOW_TO_HIGH)).toBeInTheDocument();
    expect(screen.getByText(expectedText.HIGH_TO_LOW)).toBeInTheDocument();
    expect(screen.getByText(expectedText.TOP)).toBeInTheDocument();
  });
});
