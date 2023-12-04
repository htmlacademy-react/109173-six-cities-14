export const SortType = {
  POPULAR: 'Popular',
  LOW_TO_HIGH: 'Price: low to high',
  HIGH_TO_LOW: 'Price: high to low',
  TOP: 'Top rated first'
} as const;


type SortItemProps = {
  onSort: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export default function SortItem({ onSort }: SortItemProps) {
  return Object.entries(SortType).map(([ sortKey, sortName ]) => (
    <li
      key={ sortKey }
      className="places__option places__option--active"
      tabIndex={ 0 }
      onClick={ onSort }
      data-testid="sortItemElem"
    >
      { sortName }
    </li>
  ));
}
