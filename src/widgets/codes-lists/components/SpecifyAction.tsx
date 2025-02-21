import Dictionary from '@/utils/dictionary/dictionary';

interface SpecifyActionProps {
  updatePrecision: () => void;
  precisionLabel?: string;
}

/**
 * Display a specify button which allow to upsert a specification for the code.
 *
 * The specify button will display the specify label if it has already been set.
 */
export default function SpecifyAction({
  updatePrecision,
  precisionLabel = '',
}: Readonly<SpecifyActionProps>) {
  return precisionLabel && precisionLabel !== '' ? (
    <div>
      <button
        className="btn-white mr-2"
        onClick={updatePrecision}
        title={Dictionary.setCodePrecision}
        type="button"
      >
        <span className={`glyphicon glyphicon-edit !mr-0`} />
      </button>
      {precisionLabel}
    </div>
  ) : (
    <div>
      <button className="btn-white" onClick={updatePrecision} type="button">
        <span className={`glyphicon glyphicon-plus`} />{' '}
        {Dictionary.addCodePrecision}
      </button>
    </div>
  );
}
