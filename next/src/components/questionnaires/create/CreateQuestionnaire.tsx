import CreateQuestionnaireForm from './CreateQuestionnaireForm';

interface CreateQuestionnaireProps {
  /** Stamp of the user who creates a questionnaire. */
  userStamp: string;
}

/**
 * Create a new questionnaire.
 *
 * A questionnaire must have a title, target modes, a flow logic and a language
 * formula.
 *
 * The latter two have default values whose use should be encouraged.
 *
 * {@link Questionnaire}
 */
export default function CreateQuestionnaire({
  userStamp,
}: Readonly<CreateQuestionnaireProps>) {
  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <CreateQuestionnaireForm stamp={userStamp} />
    </div>
  );
}
