import { render, screen } from '@testing-library/react';
import ReviewsForm from './reviews-form';
import { withMockStore } from '../../utils/mock-components';
import { makeMockStoreState } from '../../utils/mock';

describe('[Component Reviews-form]:', () => {
  it('Should render correct', () => {
    const ExpectedText = {
      TITLE: 'Your review',
      REVIEW_HELP: /To submit review please make sure to set/i,
      RATING: 'rating',
      COMMENT: /and describe your stay with at least/i,
      COMMENT_LENGTH: '50 characters',
      BTN: 'Submit'
    };
    const initialMockStoreState = makeMockStoreState();
    const component = withMockStore(<ReviewsForm />, initialMockStoreState);

    render(component);

    expect(screen.getByText(ExpectedText.TITLE)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.REVIEW_HELP)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.RATING)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.COMMENT)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.COMMENT_LENGTH)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.BTN)).toBeInTheDocument();
  });
});
