import Main from '../../pages/main/main';
import { AppProps } from './app.props';

export default function App({ offersCount }: AppProps): JSX.Element {
  return (
    <Main offersCount = { offersCount }></Main>
  );
}