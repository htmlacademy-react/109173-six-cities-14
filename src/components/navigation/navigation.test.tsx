import { render, screen } from '@testing-library/react';
import Navigation from './navigation';
import { makeMockStoreState, makeMockUser } from '../../utils/mock';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import { AuthorizationStatus, Namespace } from '../../const';

describe('[Component ]:', () => {
  const component = withMockHistory(<Navigation />);

  it('Should render correct if user is not authorized', () => {
    const initialMockStore = makeMockStoreState();
    const { withStoreComponent } = withMockStore(component, initialMockStore);
    const sighInTextElem = 'Sign in';

    render(withStoreComponent);
    const sighInText = screen.getByText(sighInTextElem);

    expect(sighInText).toBeInTheDocument();
  });

  it('Should render correct if user is authorized', () => {
    const user = makeMockUser();
    const initialMockStore = makeMockStoreState({
      [Namespace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userInfo: user,
      }
    });
    const { withStoreComponent } = withMockStore(component, initialMockStore);
    const signOutTextElem = 'Sign out';

    render(withStoreComponent);
    const signOutText = screen.getByText(signOutTextElem);
    const userEmail = screen.getByText(user.email);

    expect(signOutText).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });
});
