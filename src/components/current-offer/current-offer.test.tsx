import { render, screen } from '@testing-library/react';
import { makeMockComment, makeMockOffer, makeMockStoreState } from '../../utils/mock';
import { widthHistoryStore, withMockHistory, withMockStore } from '../../utils/mock-components';
import CurrentOffer from './current-offer';
import { AuthorizationStatus, Namespace } from '../../const';

describe('[Component Current-offer]:', () => {
  it('Should render correct. Do not show "Comment form", because User has "Unknown" status by default state', () => {
    const offer = makeMockOffer();
    const comments = [makeMockComment()];
    const commentFormTitle = 'Your review';
    const nearby = [offer];
    const OfferElem = {
      CONTAINER: 'offerElem',
      TITLE: 'offerTitleElem',
      BOOKMARK: 'offerBookmarkBtnElem',
      RATING: 'offerRatingElem',
      FEATURES: 'offerFeaturesElem',
      PRICE: 'offerPriceElem',
      INSIDE: 'offerInsideElem',
      HOST: 'offerHostTitleElem',
      HOST_IMG: 'offerHostImgElem',
      HOST_NAME: 'offerHostNameElem',
      DESCRIPTION: 'offerDescriptionElem',
      COMMENTS: 'offerCommentsElem',
      NEARBY: 'offerNearbyElem',
    };
    const component = widthHistoryStore(< CurrentOffer offer={ offer } comments={ comments } nearby={ nearby }/>);

    render(component);
    const ExpectElem = {
      CONTAINER: screen.getByTestId(OfferElem.CONTAINER),
      TITLE: screen.getByTestId(OfferElem.TITLE),
      BOOKMARK: screen.getByTestId(OfferElem.BOOKMARK),
      RATING: screen.getByTestId(OfferElem.RATING),
      FEATURES: screen.getByTestId(OfferElem.FEATURES),
      PRICE: screen.getByTestId(OfferElem.PRICE),
      INSIDE: screen.getByTestId(OfferElem.INSIDE),
      HOST: screen.getByTestId(OfferElem.HOST),
      HOST_IMG: screen.getByTestId(OfferElem.HOST_IMG),
      HOST_NAME: screen.getByTestId(OfferElem.HOST_NAME),
      DESCRIPTION: screen.getByTestId(OfferElem.DESCRIPTION),
      COMMENTS: screen.getByTestId(OfferElem.COMMENTS),
      NEARBY: screen.getByTestId(OfferElem.NEARBY),
    };

    expect(ExpectElem.CONTAINER).toBeInTheDocument();
    expect(ExpectElem.TITLE).toBeInTheDocument();
    expect(ExpectElem.BOOKMARK).toBeInTheDocument();
    expect(ExpectElem.FEATURES).toBeInTheDocument();
    expect(ExpectElem.PRICE).toBeInTheDocument();
    expect(ExpectElem.INSIDE).toBeInTheDocument();
    expect(ExpectElem.HOST).toBeInTheDocument();
    expect(ExpectElem.HOST_IMG).toBeInTheDocument();
    expect(ExpectElem.HOST_NAME).toBeInTheDocument();
    expect(ExpectElem.DESCRIPTION).toBeInTheDocument();
    expect(ExpectElem.COMMENTS).toBeInTheDocument();
    expect(ExpectElem.NEARBY).toBeInTheDocument();
    expect(screen.queryByText(commentFormTitle)).not.toBeInTheDocument();
  });

  it('Should render  "Comment form", if user is logged in', () => {
    const offer = makeMockOffer();
    const comments = [makeMockComment()];
    const commentFormTitle = 'Your review';
    const nearby = [offer];
    const initialMockStoreState = makeMockStoreState({
      [Namespace.USER]: {
        favorites: [],
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: null,
      }
    });
    const preparedComponent = withMockHistory(< CurrentOffer offer={ offer } comments={ comments } nearby={ nearby }/>);
    const component = withMockStore(preparedComponent, initialMockStoreState);

    render(component);
    expect(screen.getByText(commentFormTitle)).toBeInTheDocument();
  });
});
