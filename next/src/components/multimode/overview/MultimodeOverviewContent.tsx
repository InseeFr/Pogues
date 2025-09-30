import { useTranslation } from 'react-i18next';

import ButtonLink from '@/components/ui/ButtonLink';
import type { MultimodeIsMovedRules } from '@/models/multimode';

import MultimodeOverviewRules from './MultimodeOverviewRules';

interface Props {
  questionnaireId: string;
  isMovedRules?: MultimodeIsMovedRules;
  /** Whether we display the multimode as readonly (i.e. back-up version). */
  readonly?: boolean;
}

/**
 * Display the multimode of the selected questionnaire.
 *
 * If it does not exist, allow to create it through a form.
 *
 * It can be displayed in read only, in which case it does not allow to create,
 * update or delete multimode.
 */
export default function MultimodeOverviewContent({
  questionnaireId,
  isMovedRules = {},
  readonly = false,
}: Readonly<Props>) {
  const { t } = useTranslation();

  const hasRules =
    isMovedRules.leafFormula || isMovedRules.questionnaireFormula;

  if (!hasRules) {
    if (readonly) {
      // We are in readonly and there is no multimode specified.
      return <div>{t('multimode.versionNoMultimode')}</div>;
    }

    // There is no multimode specified: allow to setup multimode.
    return (
      <ButtonLink
        to="/questionnaire/$questionnaireId/multimode/edit"
        params={{ questionnaireId }}
      >
        + {t('multimode.new')}
      </ButtonLink>
    );
  }

  return (
    <MultimodeOverviewRules
      isMovedRules={isMovedRules}
      questionnaireId={questionnaireId}
      readonly={readonly}
    />
  );
}
