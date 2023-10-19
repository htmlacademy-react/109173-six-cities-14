import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authStatus: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authStatus, children} = props;

  return (
    (authStatus === AuthorizationStatus.Auth)
      ? children
      : <Navigate to={AppRoutes.Login} />
  );
}
