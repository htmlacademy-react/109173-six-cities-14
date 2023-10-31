import { Helmet } from 'react-helmet-async';

import { MainProps, PlacesProps, LocationItemProps } from './main.props';
import OffersList from '../../components/offers-list/offers-list';

enum CSSCLasses {
  PlacesContainer = 'cities__places-container container',
  NoPlaces = 'cities__places-container--empty'
}

function LocationItem({ itemName }: LocationItemProps): React.ReactNode {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{ itemName }</span>
      </a>
    </li>
  );
}

function MainEmpty(): React.ReactNode {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
      </div>
    </section>
  );
}

function Places({ offers, offersCount }: PlacesProps): React.ReactNode {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{ offersCount } places to stay in Amsterdam</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={ 0 }>
          Popular
          <svg className="places__sorting-arrow" width={ 7 } height={ 4 }>
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={ 0 }>Popular</li>
          <li className="places__option" tabIndex={ 0 }>Price: low to high</li>
          <li className="places__option" tabIndex={ 0 }>Price: high to low</li>
          <li className="places__option" tabIndex={ 0 }>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        <OffersList offers={ offers }></OffersList>
      </div>
    </section>
  );
}

function CardMap(): React.ReactNode {
  return <section className="cities__map map"></section>;
}

export default function Main({ locations, offers, offersCount, isMainEmpty }: MainProps): React.ReactNode {
  const placesClassName = (!isMainEmpty)
    ? CSSCLasses.PlacesContainer
    : `${CSSCLasses.PlacesContainer} ${CSSCLasses.NoPlaces}`;

  return (
    <>
      <Helmet>
        <title>6 cities - Main</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              locations.slice()
                .map((location: string) => <LocationItem key={ location } itemName={ location }></LocationItem>)
            }
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className={ placesClassName }>
          { (isMainEmpty && <MainEmpty />) || <Places offers={ offers } offersCount={ offersCount }/>}

          <div className="cities__right-section">
            { !isMainEmpty && <CardMap/>}
          </div>
        </div>
      </div>
    </>
  );
}
