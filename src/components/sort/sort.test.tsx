import { render, screen } from '@testing-library/react';
import Sort from './sort';
import { withMockStore } from '../../utils/mock-components';
import { upperCaseFirst } from '../../utils/offer';
import userEvent from '@testing-library/user-event';

describe('[Component Sort]:', () => {
  it('Should render correct', () => {
    const currentSortName = upperCaseFirst('unknown sort name');
    const onSortChange = vi.fn();
    const { withStoreComponent } = withMockStore(<Sort currentSort={ currentSortName } onSortChange={ onSortChange } />);

    render(withStoreComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Unknown sort name')).toBeInTheDocument();
  });

  it('Should called with "Price: low to high" sort type when click on it', async () => {
    const user = userEvent.setup();
    const currentSortName = upperCaseFirst('unknown sort name');
    const onSortChange = vi.fn();
    const { withStoreComponent } = withMockStore(<Sort currentSort={ currentSortName } onSortChange={ onSortChange } />);

    render(withStoreComponent);
    const sortItem = screen.getByText('Price: low to high');
    await user.click(sortItem);
    screen.debug();


    expect(onSortChange).toBeCalled();
    expect(onSortChange).toBeCalledWith('Price: low to high');
  });
});
