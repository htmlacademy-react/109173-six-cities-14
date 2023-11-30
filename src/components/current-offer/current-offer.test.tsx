import { render, screen } from '@testing-library/react';
import { makeMockComment, makeMockOffer } from '../../utils/mock';
import { widthHistoryStore } from '../../utils/mock-components';
import CurrentOffer from './current-offer';

describe('[Component Current-offer]:', () => {
  it('Should render correct', () => {
    const offer = makeMockOffer();
    const comments = [makeMockComment()];
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
  });
});
