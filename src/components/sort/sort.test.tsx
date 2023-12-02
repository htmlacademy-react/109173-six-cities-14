import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { withMockStore } from '../../utils/mock-components';
import { upperCaseFirst } from '../../utils/offer';

describe('[Component Sort]:', () => {
  it('Should render correct', () => {
    const currentSortName = upperCaseFirst('unknown sort name');
    const onSortChange = vi.fn();
    const component = withMockStore(<Sort currentSort={ currentSortName } onSortChange={ onSortChange } />);

    render(component);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Unknown sort name')).toBeInTheDocument();
  });
});
