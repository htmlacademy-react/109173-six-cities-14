import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { AppRoute, AuthorizationStatus, Namespace } from '../../const';
import { makeMockStoreState } from '../../utils/mock';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import { Route, Routes } from 'react-router-dom';

describe('[Component Private-route]:', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.FAVORITES);
  });

  it('Should render "Login page" when user didnt logged in and page AppRoute.FAVORITES', () => {
    const expectedText = 'Login page';
    const notExpectedText = 'Favorites page';
    const initialMockStore = makeMockStoreState({
      [Namespace.USER]: {
        favorites: [],
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userInfo: null,
      }
    });
    const preparedComponent = withMockHistory(
      <Routes>
        <Route path={ AppRoute.LOGIN } element={ <span>{ expectedText }</span> } />
        <Route path={ AppRoute.FAVORITES } element={
          <PrivateRoute redirectTo={ AppRoute.LOGIN }>
            <span>{ notExpectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const component = withMockStore(preparedComponent, initialMockStore);

    render(component);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Should render "Main page" when user loggen in and page AppRoute.LOGIN', () => {
    const expectedText = 'Main page';
    const notExpectedText = 'Login page';
    const initialMockStore = makeMockStoreState({
      [Namespace.USER]: {
        favorites: [],
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: null,
      }
    });
    const preparedComponent = withMockHistory(
      <Routes>
        <Route path={ AppRoute.MAIN } element={ <span> { expectedText } </span> } />
        <Route path={ AppRoute.LOGIN } element={
          <PrivateRoute redirectTo={ AppRoute.MAIN }>
            <span>{ notExpectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const component = withMockStore(preparedComponent, initialMockStore);
    mockHistory.push(AppRoute.LOGIN);

    render(component);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Should render "Favorites page" when user is logged in and page is "AppRoute.FAVORITES"', () => {
    const expectedText = 'Favorites page';
    const notExpectedChildren = 'Not expected text';
    const initialMockStore = makeMockStoreState({
      [Namespace.USER]: {
        favorites: [],
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: null,
      }
    });
    const preparedComponent = withMockHistory(
      <Routes>
        <Route path={ AppRoute.LOGIN } element={ <span>{ notExpectedChildren }</span> } />
        <Route path={ AppRoute.FAVORITES } element={
          <PrivateRoute redirectTo={ AppRoute.LOGIN }>
            <span>{ expectedText }</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );
    const component = withMockStore(preparedComponent, initialMockStore);

    render(component);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedChildren)).not.toBeInTheDocument();
  });
});