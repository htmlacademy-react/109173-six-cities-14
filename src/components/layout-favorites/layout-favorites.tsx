import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AuthorizationStatus } from '../../const';

export default function LayoutFavorites(): JSX.Element {
  return (
    <div className="page">
      <Header authStatus={AuthorizationStatus.Auth}></Header>

      <main className="page__main page__main--index">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
}
