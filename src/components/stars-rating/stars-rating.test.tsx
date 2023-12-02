import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

describe('[Component Start-raring]:', () => {
  it('Should render correct', () => {
    const starsRatingId = 'starsRatingElem';
    const rating = 3;
    const expectedWith = '60px'; // 100 / 5 * 3;
    const component = <StarsRating rating={ rating }/>;

    render(component);
    const starsRatingElem = screen.getByTestId(starsRatingId);

    expect(starsRatingElem.style.width).toBe(expectedWith);
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
