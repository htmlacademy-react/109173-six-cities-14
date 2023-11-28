import { cityProcess, setCityAction } from './city-process';

describe('City-Process Slice: when setCityAction', () => {
  it('Should return initisl state with empty action', () => {
    const emptyAction = {type: '', payload: ''};
    const expectedState = {
      city: 'Paris',
    };

    const result = cityProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should set a "Cologne" city name ', () => {
    const newCity = 'Cologne';
    const initialState = {
      city: 'Paris',
    };
    const expectedState = {
      city: newCity,
    };

    const result = cityProcess.reducer(initialState, setCityAction(newCity));

    expect(result).toEqual(expectedState);
  });
});
