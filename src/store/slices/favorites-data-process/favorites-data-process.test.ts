import { makeFakeOffer } from '../../../utils/mock';
import { addFavoriteItemAction, favoritesDataProcess, loadFavoritesAction, removeFavoriteItemAction } from './favorites-data-process';

describe('Favorites-Data-Process Slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = {
      favorites: [],
    };

    const result = favoritesDataProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Shoult load Favorites Offers when loadFavoritesAction', () => {
    const offer = makeFakeOffer();
    const initialState = {
      favorites: [],
    };
    const expectedState = {
      favorites: [ offer ]
    };

    const result = favoritesDataProcess.reducer(initialState, loadFavoritesAction([ offer ]));

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
