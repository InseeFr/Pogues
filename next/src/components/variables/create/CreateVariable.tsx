import CreateVariableForm from './CreateVariableForm';

interface Props {
  /** Questionnaire to add the variable to. */
  questionnaireId: string;
  /** Scopes availables in the questionnaire. */
  scopes: Set<string>;
}

/**
 * Create a new variable.
 *
 * A questionnaire must have a name, type, datatype. It may have a description
 * and a scope (defaults to whole questionnaire).
 */
export default function CreateVariable({
  questionnaireId,
  scopes,
}: Readonly<Props>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateVariableForm questionnaireId={questionnaireId} scopes={scopes} />
    </div>
  );
}
