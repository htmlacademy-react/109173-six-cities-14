import { useNavigate } from 'react-router-dom';
import { AppRoute, cities } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCityAction } from '../../store/slices/city-process/city-process';
import { getRandomInRange } from '../../utils/common';

export default function RandomCity(): React.ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomIndex = getRandomInRange(0, cities.length - 1);
  const randomCity = cities.at(randomIndex);

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
        <a className="locations__item-link" href="#" onClick={ handleCityClick } data-testid="randimCityLinkElem">
          <span>{ randomCity }</span>
        </a>
      </div>
    </section>
  );
}
