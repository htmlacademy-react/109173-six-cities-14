import { useState } from 'react';
import cn from 'classnames';

import { upperCaseFirst } from '../../utils/offer';
import SortItem from '../sort-item/sort-item';

const CSSClasses = {
  SORT_BASE: 'places__options places__options--custom',
  SORT_OPENED: 'places__options--opened'
} as const;

type SortProps = {
  currentSort: string;
  onSortChange: (currentSort: string) => void;
};

export default function Sort({ currentSort, onSortChange }: SortProps): React.ReactElement {
  const [sortOpened, setSortOpened] = useState(false);
  const currentSortName = upperCaseFirst(currentSort);

  function handleSortToggle() {
    const isSortOpened = !sortOpened;

    setSortOpened(isSortOpened);
  }

  function handleSortChange(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const target = (evt.target as HTMLElement);
    const selectedSortType = target.textContent;


    if(selectedSortType) {
      onSortChange(selectedSortType);
      setSortOpened(false);
    }
  }

  return (
    <form className="places__sorting" action="#" method="get" onClick={ handleSortToggle } data-testid="sortFormElem" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={ 0 }>
        { currentSortName }
        <svg className="places__sorting-arrow" width={ 7 } height={ 4 }>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(
        CSSClasses.SORT_BASE,
        { [CSSClasses.SORT_OPENED]: sortOpened }
      )}
      >
        <SortItem onSort={ handleSortChange } />
      </ul>
    </form>
  );
}
