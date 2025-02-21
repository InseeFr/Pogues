import Dictionary from '@/utils/dictionary/dictionary';

interface FilterActionProps {
  updateFilter: () => void;
  filterLabel?: string;
}

/**
 * Display a filter button which allow to upsert a filter for the code.
 *
 * The filter button will display the filter label if it has already been set.
 */
export default function FilterAction({
  updateFilter,
  filterLabel = '',
}: Readonly<FilterActionProps>) {
  return filterLabel && filterLabel !== '' ? (
    <div>
      <button
        className="btn-white mr-2"
        onClick={updateFilter}
        title={Dictionary.setCodeFilter}
        type="button"
      >
        <span className={`glyphicon glyphicon-edit !mr-0`} />
      </button>
      {filterLabel}
    </div>
  ) : (
    <div>
      <button className="btn-white" onClick={updateFilter} type="button">
        <span className={`glyphicon glyphicon-filter`} />{' '}
        {Dictionary.addCodeFilter}
      </button>
    </div>
  );
}
