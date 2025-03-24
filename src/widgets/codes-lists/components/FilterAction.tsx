import Dictionary from '@/utils/dictionary/dictionary';

interface FilterActionProps {
  updateFilter: () => void;
  conditionFilter?: string;
}

/**
 * Display a filter button which allow to upsert a filter for the code.
 *
 * The filter button will display the filter label if it has already been set.
 */
export default function FilterAction({
  updateFilter,
  conditionFilter = '',
}: Readonly<FilterActionProps>) {
  return conditionFilter && conditionFilter !== '' ? (
    <div className="grid grid-cols-[auto_1fr] items-center">
      <button
        className="btn-white mr-2"
        onClick={updateFilter}
        title={Dictionary.setCodeFilter}
        type="button"
      >
        <span className={`glyphicon glyphicon-edit !mr-0`} />
      </button>
      {conditionFilter}
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
