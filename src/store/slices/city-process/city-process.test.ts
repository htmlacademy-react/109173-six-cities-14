import { cityProcess, setCityAction } from './city-process';

describe('[City process Slice]:', () => {
  it('Should return initial state with empty initialState and action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = {
      city: 'Paris',
    };

    const result = cityProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should set a "Cologne" city name ', () => {
    const newCity = 'Cologne';
    const expectedState = {
      city: newCity,
    };

    const result = cityProcess.reducer(undefined, setCityAction(newCity));

    expect(result).toEqual(expectedState);
  });
});
