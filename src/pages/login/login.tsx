import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { getAuthStatus } from '../../store/slices/user-process/selectors';

import { AppRoute, AuthorizationStatus, PASSWORD_MIN_LENGTH } from '../../const';
import RandomCity from '../../components/random-city/random-city';

export default function Login(): React.ReactElement {
  const userAuthStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  const userLogin = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  if(userAuthStatus === AuthorizationStatus.AUTH) {
    return <Navigate to={ AppRoute.MAIN } />;
  }

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!userLogin.current || !userPassword.current) {
      return false;
    }

    const userLoginValue = userLogin.current.value;
    const userPasswordValue = userPassword.current.value;

    dispatch(loginAction({
      email: userLoginValue,
      password: userPasswordValue
    }));
  }

  return (
    <div className="page__login-container container">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <section className="login">
        <h1 className="login__title" data-testid="signInTitleElem">Sign in</h1>
        <form className="login__form form" action="#" method="post" onSubmit={ handleFormSubmit }>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={ userLogin } />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input className="login__input form__input" type="password" name="password" placeholder="Password" minLength={ PASSWORD_MIN_LENGTH } required ref={ userPassword } />
          </div>
          <button className="login__submit form__submit button" type="submit" data-testid="signInBtnElem">Sign in</button>
        </form>
      </section>

      <RandomCity />
    </div>
  );
}
