import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeMockComment } from '../../utils/mock';

describe('[Component Reviews-list]:', () => {
  it('Should render correct', () => {
    const reviewsItemId = 'reviewsItem';
    const comment = makeMockComment();
    const comments = [ comment, comment ];
    const expectedCommentsCount = 2;
    const component = <ReviewsList comments={ comments }/>;

    render(component);
    const commentELems = screen.getAllByTestId(reviewsItemId);

    expect(commentELems.length).toBe(expectedCommentsCount);
  });
});
