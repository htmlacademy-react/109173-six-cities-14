import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { getFakeStore, makeMockStoreState } from './mock';
import { State } from '../types/state';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';

export function getHookStoreWrapper(store: Store): React.FC {
  const wrapperFunc = ({ children }: { children?: React.ReactNode }) => <Provider store={store}>{children}</Provider>;
  return wrapperFunc;
}

export function withMockStore(component: React.ReactElement, initialState: Partial<State> = {}) {
  const { mockStoreCreator } = getFakeStore();
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={ mockStore }>{ component }</Provider>,
    store: mockStore,
  };
}

export function withMockHistory(component: React.ReactElement, history?: MemoryHistory) {
  const memoryHistory = history || createMemoryHistory();

  return (
    <HistoryRouter history={ memoryHistory }>
      <HelmetProvider>
        { component }
      </HelmetProvider>
    </HistoryRouter>
  );
}

export function widthHistoryStore(component: React.ReactElement) {
  const initialMockStoreState = makeMockStoreState();
  const componentWithHistory = withMockHistory(component);
  const componentWithStore = withMockStore(componentWithHistory, initialMockStoreState);

  return componentWithStore;
}
