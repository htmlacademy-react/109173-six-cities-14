import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/slices/user-process/selectors';

type PrivateRouteProps = {
  redirectTo: typeof AppRoute[keyof typeof AppRoute];
  children: React.ReactElement;
}

export default function PrivateRoute({
  redirectTo = AppRoute.PAGE_404,
  children
}: PrivateRouteProps): React.ReactElement {

  const authStatus = useAppSelector(getAuthStatus);
  const isUserLoggedIn = (authStatus === AuthorizationStatus.AUTH);

  return (
    (isUserLoggedIn)
      ? children
      : <Navigate to={redirectTo} />
  );
}
