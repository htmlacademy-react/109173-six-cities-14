import { render, screen } from '@testing-library/react';
import StarsRatingForm from './stars-rating-form';

describe('[Component Stars-rating-form]:', () => {
  it('Should render correct', () => {
    const rating = 3;
    const expectedStarText = 'not bad';
    const onRatingChange = vi.fn();
    const starsRatingId = 'starsRatingElem';
    const starsRatingInputId = 'starsRatingInputElem';
    const starsRatingLabelId = 'starsRatingLabelElem';
    const component = <StarsRatingForm rating={ rating } onRatingChange={ onRatingChange }/>;

    render(component);
    const expectElem = screen.getByTestId(starsRatingId);
    const starInputs = screen.getAllByTestId(starsRatingInputId);
    const starLabels = screen.getAllByTestId(starsRatingLabelId);

    expect(expectElem).toBeInTheDocument();
    // т.к. звезды отреверсированы, начинаем отсчет с конца
    expect(starInputs.at(4)).toBeChecked();
    expect(starInputs.at(3)).toBeChecked();
    expect(starInputs.at(2)).toBeChecked();
    expect(starInputs.at(1)).not.toBeChecked();
    expect(starInputs.at(0)).not.toBeChecked();
    expect(starLabels.at(2)?.title).toBe(expectedStarText);
  });
});
