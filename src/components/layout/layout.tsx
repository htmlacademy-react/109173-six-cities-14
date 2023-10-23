import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { AppRoutes, AuthorizationStatus } from '../../const';


export default function Layout(): React.ReactElement {
  const location = useLocation();
  // const isFavoritesPage = (String(location.pathname) === String(AppRoutes.Favorites));
  const isFavoritesPage = (location.pathname === String(AppRoutes.Favorites));

  return (
    // + page page--gray page--login || page page--gray page--main"
    <div className="page page--gray page--main">
      <Header authStatus={AuthorizationStatus.Auth} />

      <main className="page__main page__main--index">
        <Outlet />
      </main>


      { isFavoritesPage && <Footer /> }
    </div>
  );
}
