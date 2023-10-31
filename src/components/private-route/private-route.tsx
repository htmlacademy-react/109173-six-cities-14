import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  redirectTo: AppRoutes;
  authStatus: AuthorizationStatus;
  children: React.ReactElement;
}

export default function PrivateRoute({ redirectTo = AppRoutes.Page404, authStatus, children }: PrivateRouteProps): React.ReactElement {
  const isAuthorizedUser = (authStatus === AuthorizationStatus.Auth);
  const location: string = useLocation().pathname;
  const isLoginPage = (location === String(AppRoutes.Login));

  return (
    (
      (isAuthorizedUser && !isLoginPage) || // Авторизованного пользователя с login редиректим на main
      (!isAuthorizedUser && isLoginPage) // Неавторизованному - показываем Login page
    )
      ? children
      : <Navigate to={redirectTo} />
  );
}
