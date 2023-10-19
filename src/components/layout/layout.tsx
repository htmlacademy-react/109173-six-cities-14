import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import { AuthorizationStatus } from '../../const';


export default function Layout(): JSX.Element {
  return (
    // + page page--gray page--login || page page--gray page--main"
    <div className="page page--gray page--main">
      <Header authStatus={AuthorizationStatus.Auth} />

      <main className="page__main page__main--index">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
