import { render, screen } from '@testing-library/react';
import ReviewsItem from './reviews-item';
import { makeMockComment } from '../../utils/mock';
import { getFormattedDate } from '../../utils/common';
import { DateFormat } from '../../const';

describe('[Component Reviews-item]:', () => {
  it('Should render correct', () => {
    const comment = makeMockComment();
    const commentDate = new Date(Date.parse(comment.date));
    const monthYearDate = getFormattedDate(commentDate, DateFormat.MONTH_YEAR);
    const ratingElem = 'reviewsratingElem';
    const component = <ReviewsItem comment={ comment }/>;

    render(component);
    const userImg = screen.getByAltText('Reviews avatar');
    const userName = screen.getByText(comment.user.name);
    const userComment = screen.getByText(comment.comment);
    const userCommentDate = screen.getByText(monthYearDate);
    const userRating = screen.getByTestId(ratingElem);

    expect(userImg).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userComment).toBeInTheDocument();
    expect(userCommentDate).toBeInTheDocument();
    expect(userRating).toBeInTheDocument();
  });
});
