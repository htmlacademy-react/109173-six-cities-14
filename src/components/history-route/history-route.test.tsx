import { render, screen } from '@testing-library/react';
import HistoryRouter from './history-route';
import { createMemoryHistory } from 'history';

describe('[Component History-router]:', () => {
  it('Should render correct', () => {
    const basename = '/';
    const expectedText = /Test text/i;
    const children = <span>Test text</span>;
    const mockHistory = createMemoryHistory();
    const component = <HistoryRouter history={ mockHistory } basename={ basename }>{ children }</HistoryRouter>;

    render(component);
    const expectElem = screen.getByText(expectedText);

    expect(expectElem).toBeInTheDocument();
  });
});
