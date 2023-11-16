import { useState } from 'react';
import cn from 'classnames';

export const SortType = {
  'POPULAR': 'Popular',
  'LOW_TO_HIGH': 'Price: low to high',
  'HIGH_TO_LOW': 'Price: high to low',
  'TOP': 'Top rated first'
};


const CSSClasses = {
  'SORT_BASE': 'places__options places__options--custom',
  'SORT_OPENED': 'places__options--opened'
};

type SortProps = {
  onSortChange: (currentSort: string) => void;
};

type SortItemProps = {
  onSort: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

function SortItem({ onSort }: SortItemProps) {
  return Object.entries(SortType).map((sort) => (
    <li key={ sort[0] } className="places__option places__option--active" tabIndex={ 0 } onClick={ (evt) => {
      evt.stopPropagation();
      onSort(evt);
    } }
    >
      { sort[1] }
    </li>
  ));
}

export default function Sort({ onSortChange }: SortProps): React.ReactElement {
  const [sortOpened, setSortOpened] = useState(false);

  function sortToggleHandler() {
    const isSortOpened = !sortOpened;

    setSortOpened(isSortOpened);
  }

  function sortChangeHandler(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const target = (evt.target as HTMLElement);
    const selectedSortType = target.textContent;


    if(selectedSortType) {
      onSortChange(selectedSortType);
    }
  }

  return (
    <form className="places__sorting" action="#" method="get" onClick={ sortToggleHandler }>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={ 0 }>
        Popular
        <svg className="places__sorting-arrow" width={ 7 } height={ 4 }>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(
        CSSClasses.SORT_BASE,
        { [CSSClasses.SORT_OPENED]: sortOpened }
      )}
      >
        <SortItem onSort={ sortChangeHandler } />
      </ul>
    </form>
  );
}
