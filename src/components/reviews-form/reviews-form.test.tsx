import { fireEvent, render, screen } from '@testing-library/react';
import ReviewsForm from './reviews-form';
import { withMockStore } from '../../utils/mock-components';
import { makeMockStoreState } from '../../utils/mock';
import { State } from '../../types/state';
import userEvent from '@testing-library/user-event';

describe('[Component Reviews-form]:', () => {
  let initialMockStoreState: State;

  beforeAll(() => {
    initialMockStoreState = makeMockStoreState();
  });

  it('Should render correct', () => {
    const ExpectedText = {
      TITLE: 'Your review',
      REVIEW_HELP: /To submit review please make sure to set/i,
      RATING: 'rating',
      COMMENT: /and describe your stay with at least/i,
      COMMENT_LENGTH: '50 characters',
      BTN: 'Submit'
    };
    const component = withMockStore(<ReviewsForm />, initialMockStoreState);

    render(component);
    const submitBtn = screen.getByText(ExpectedText.BTN);

    expect(screen.getByText(ExpectedText.TITLE)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.REVIEW_HELP)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.RATING)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.COMMENT)).toBeInTheDocument();
    expect(screen.getByText(ExpectedText.COMMENT_LENGTH)).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('Should call "handleFormSubmit" when form submitted', () => {
    const reviewsFormId = 'reviewsFormElem';
    const handleFormSubmit = vi.fn();
    const component = withMockStore(<ReviewsForm />, initialMockStoreState);

    render(component);
    const reviewsForm = screen.getByTestId(reviewsFormId);
    reviewsForm.addEventListener('submit', handleFormSubmit);
    fireEvent.submit(reviewsForm);
    reviewsForm.removeEventListener('submit', handleFormSubmit);

    expect(handleFormSubmit).toBeCalled();
  });

  it('Should enable submit BTN when typed enuogh symbols to textarea', async () => {
    const user = userEvent.setup();
    const textareaId = 'reviewsTextElem';
    const submitBtnText = 'Submit';
    const testText = `The deluxe room was a quite comfortable one with all the adequate facilities.
    The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.`;
    const component = withMockStore(<ReviewsForm />, initialMockStoreState);

    render(component);
    const textarea = screen.getByTestId(textareaId);
    const submitBtn = screen.getByText(submitBtnText);
    await user.type(textarea, testText);

    expect(submitBtn).toBeEnabled();
  });
});
