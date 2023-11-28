import { makeFakeOffer } from '../../../utils/mock';
import { addFavoriteItemAction, favoritesDataProcess, loadFavoritesAction, removeFavoriteItemAction } from './favorites-data-process';

describe('Favorites-Data-Process Slice', () => {
  it('Should return initisl state with empty action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Shoult load Favorites Offers when loadFavoritesAction', () => {
    const offerOne = makeFakeOffer();
    const offerTwo = makeFakeOffer();
    const initialState = {
      favorites: [],
    };
    const expectedState = {
      favorites: [ offerOne, offerTwo ]
    };

    const result = favoritesDataProcess.reducer(initialState, loadFavoritesAction([ offerOne, offerTwo ]));

    expect(result).toEqual(expectedState);
  });

  it('Shoult add Offer to "Favorites" when addFavoriteItemAction', () => {
    const offer = makeFakeOffer();
    const initialState = {
      favorites: [],
    };
    const expectedState = {
      favorites: [ offer ]
    };

    const result = favoritesDataProcess.reducer(initialState, addFavoriteItemAction(offer));

    expect(result).toEqual(expectedState);
  });

  it('Shoult remove Offer from "Favorites" when removeFavoriteItemAction', () => {
    const offer = makeFakeOffer();
    const initialState = {
      favorites: [ offer ],
    };
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(initialState, removeFavoriteItemAction(offer));

    expect(result).toEqual(expectedState);
  });
});
