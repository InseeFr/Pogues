import Dictionary from '@/utils/dictionary/dictionary';

interface PrecisionActionProps {
  updatePrecision: () => void;
  precisionLabel?: string;
}

/**
 * Display a clarification button which allow to upsert a specification for the code.
 *
 * The clarification button will display the clarification label if it has already been set.
 */
export default function PrecisionAction({
  updatePrecision,
  precisionLabel = '',
}: Readonly<PrecisionActionProps>) {
  return precisionLabel && precisionLabel !== '' ? (
    <div className="grid grid-cols-[auto_1fr] items-center">
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
