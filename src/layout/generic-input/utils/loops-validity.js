import { getQuestionnaireScope } from '@/widgets/component-new-edit/components/variables/utils-loops';

import { COMPONENT_TYPE } from '../../../constants/pogues-constants';

const { LOOP } = COMPONENT_TYPE;

export function isLoopsValid(
  componentsStore,
  activeQuestionnaire,
  externalQuestionnairesLoops,
  codeListsStore,
) {
  let loopsValid = true;

  /**
   * Check if a loop :
   * - is based on a scope (loop, table) that has been deleted
   * - has a initial or final member (sequence, subsequence) that has been deleted
   */

  const componentsLoop = Object.values(componentsStore).filter(
    (component) => component.type === LOOP,
  );
  const externalLoopsAvailable = externalQuestionnairesLoops || {};
  const externalQuestionnnairesId =
    activeQuestionnaire.childQuestionnaireRef || [];
  const referencedLoops = Object.keys(externalLoopsAvailable)
    .filter((key) => externalQuestionnnairesId.includes(key))
    .reduce((acc, key) => [...acc, ...externalLoopsAvailable[key].loops], []);

  if (componentsLoop.length > 0) {
    componentsLoop.forEach((component) => {
      if (
        !componentsStore[component.initialMember] ||
        !componentsStore[component.finalMember] ||
        componentsStore[component.initialMember].weight >
          componentsStore[component.finalMember].weight ||
        (component.basedOn &&
          !componentsStore[component.basedOn] &&
          !referencedLoops.some((loop) => loop.id === component.basedOn))
      ) {
        loopsValid = false;
      }
    });
  }

  /**
   * Check if a single response (outside or inside a table) is based on a variable whose scope has been removed.
   */

  const availableScopeIds = new Set(
    getQuestionnaireScope(componentsStore, referencedLoops).map(
      (scope) => scope.id,
    ),
  );

  const variableReferences = Object.values(codeListsStore).filter(
    (codeList) => codeList.scope !== undefined,
  );

  const hasInvalidScope = variableReferences.some(
    (variable) => !availableScopeIds.has(variable.scope),
  );

  if (hasInvalidScope) {
    loopsValid = false;
  }

  return loopsValid;
}
