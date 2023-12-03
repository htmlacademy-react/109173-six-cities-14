import { render, screen } from '@testing-library/react';
import RandomCity from './random-city';
import { widthHistoryStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';

describe('[Component ]:', () => {
  it('Should render correct', () => {
    const randomCityId = 'randomCityElem';

    const component = widthHistoryStore(<RandomCity />);

    render(component);
    const expectElem = screen.getByTestId(randomCityId);

    expect(expectElem).toBeInTheDocument();
  });

  it('Should call "handleCityClick"', async () => {
    const user = userEvent.setup();
    const randomCityLinkId = 'randimCityLinkElem';
    const handleCityClick = vi.fn();

    const component = widthHistoryStore(<RandomCity />);

    render(component);
    const expectElem = screen.getByTestId(randomCityLinkId);
    expectElem.addEventListener('click', handleCityClick);
    await user.click(expectElem);
    expectElem.removeEventListener('click', handleCityClick);

    expect(handleCityClick).toBeCalled();
  });
});
