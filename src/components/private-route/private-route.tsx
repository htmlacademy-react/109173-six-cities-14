import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authStatus: AuthorizationStatus;
  children: React.ReactElement;
}

export default function PrivateRoute(props: PrivateRouteProps): React.ReactElement {
  const {authStatus, children} = props;

  return (
    (authStatus === AuthorizationStatus.Auth)
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}
