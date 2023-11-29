import { makeFakeOffer } from '../../../utils/mock';
import { addFavoriteItemAction, favoritesDataProcess, loadFavoritesAction, removeFavoriteItemAction } from './favorites-data-process';

describe('[Favorites datap process Slice]:', () => {
  it('Should return initial state with empty initialState and action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Shoult load Favorites Offers when loadFavoritesAction', () => {
    const offer = makeFakeOffer();
    const expectedState = {
      favorites: [ offer ]
    };

    const result = favoritesDataProcess.reducer(undefined, loadFavoritesAction([ offer ]));

    expect(result).toEqual(expectedState);
  });

  it('Shoult add Offer to "Favorites" when addFavoriteItemAction', () => {
    const offer = makeFakeOffer();
    const expectedState = {
      favorites: [ offer ]
    };

    const result = favoritesDataProcess.reducer(undefined, addFavoriteItemAction(offer));

    expect(result).toEqual(expectedState);
  });

  it('Shoult remove Offer from "Favorites" when removeFavoriteItemAction', () => {
    const offer = makeFakeOffer();
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(undefined, removeFavoriteItemAction(offer));

    expect(result).toEqual(expectedState);
  });
});
