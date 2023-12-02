import { makeMockOffer } from '../../../utils/mock';
import { addFavoriteItemAction, clearFavoritesAction, favoritesDataProcess, loadFavoritesAction, removeFavoriteItemAction } from './favorites-data-process';

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
    const offer = makeMockOffer();
    const expectedState = {
      favorites: [ offer ]
    };

    const result = favoritesDataProcess.reducer(undefined, loadFavoritesAction([ offer ]));

    expect(result).toEqual(expectedState);
  });

  it('Shoult add Offer to "Favorites" when addFavoriteItemAction', () => {
    const offer = makeMockOffer();
    const expectedState = {
      favorites: [ offer ]
    };

    const result = favoritesDataProcess.reducer(undefined, addFavoriteItemAction(offer));

    expect(result).toEqual(expectedState);
  });

  it('Shoult remove Offer from "Favorites" when removeFavoriteItemAction', () => {
    const offer = makeMockOffer();
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(undefined, removeFavoriteItemAction(offer));

    expect(result).toEqual(expectedState);
  });

  it('Should clear "Favorites" when "clearFavoritesAction"', () => {
    const offer = makeMockOffer();
    const initialState = {
      favorites: [ offer ],
    };
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(initialState, clearFavoritesAction());

    expect(result).toEqual(expectedState);
  });
});
