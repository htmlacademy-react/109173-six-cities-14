import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '.';
import { getAuthStatus } from '../store/slices/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../const';
import { toggleFavoriteAction } from '../store/api-action';

type UseFavoriteProps = {
  id: string;
  isFavorite: boolean;
}

export default function useFavorite({ id: offerId, isFavorite }: UseFavoriteProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();

  function handleFavoriteClick() {
    if(authStatus !== AuthorizationStatus.AUTH) {
      navigate(AppRoute.LOGIN);
    }

    const status = !isFavorite;

    dispatch(toggleFavoriteAction({ offerId, status }));
  }

  return handleFavoriteClick;
}
