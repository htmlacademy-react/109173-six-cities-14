import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import Header from '../../components/header/header';

// Добавим стилей (просто пощупать typescript-plugin-css-modules)
import styles from './page-404.module.css';

export default function Page404(): React.ReactElement {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities - 404</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className={`container ${styles.container}`}>
          <h1>404 Requested page Not Found</h1>
          <Link to={ AppRoute.MAIN }>{'<- Return to main page'}</Link>
        </div>
      </main>
    </div>
  );
}
