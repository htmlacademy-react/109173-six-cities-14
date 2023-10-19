import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

export default function Page404(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header></Header>

      <main className="page__main page__main--favorites">
        <div className="container">
          <h1>404 Requested page Not Found</h1>
          <Link to="/">{'<- Return to main page'}</Link>
        </div>
      </main>
    </div>
  );
}
