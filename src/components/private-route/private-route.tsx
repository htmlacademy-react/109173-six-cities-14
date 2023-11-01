import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  redirectTo: AppRoutes;
  isUserLoggedIn: boolean;
  children: React.ReactElement;
}

export default function PrivateRoute({
  redirectTo = AppRoute.Page404,
  isUserLoggedIn = false,
  children
}: PrivateRouteProps): React.ReactElement {

  const location: string = useLocation().pathname;
  const isLoginPage = (location === String(AppRoute.Login));

  return (
    (
      (isUserLoggedIn && !isLoginPage) || // Авторизованного пользователя с login редиректим на main
      (!isUserLoggedIn && isLoginPage) // Неавторизованному - показываем Login page
    )
      ? children
      : <Navigate to={redirectTo} />
  );
}
