import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/slices/city-process/selectors';

export default function MainEmpty(): React.ReactNode {
  const currentCity = useAppSelector(getCity);

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in { currentCity }</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </>
  );
}
