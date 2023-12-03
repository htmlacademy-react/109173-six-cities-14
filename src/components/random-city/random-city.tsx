import { useNavigate } from 'react-router-dom';
import { AppRoute, cities } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCityAction } from '../../store/slices/city-process/city-process';
import { getRandomInRange } from '../../utils/common';

type RandomCityProps = {
  city?: string;
};

export default function RandomCity({ city }: RandomCityProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomIndex = getRandomInRange(0, cities.length - 1);
  const randomCity = (city) ? city : cities.at(randomIndex);

  function handleCityClick() {
    if(!randomCity) {
      return;
    }

    dispatch(setCityAction(randomCity));
    navigate(AppRoute.MAIN);
  }

  return (
    <section className="locations locations--login locations--current" data-testid="randomCityElem">
      <div className="locations__item">
        <a className="locations__item-link" href="#" onClick={ handleCityClick } data-testid="randomCityLinkElem">
          <span>{ randomCity }</span>
        </a>
      </div>
    </section>
  );
}
