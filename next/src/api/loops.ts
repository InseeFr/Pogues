import { Loop } from '@/models/loop';

import { instance } from './instance';

/** Create a new loop. */
export async function postLoop(
  questionnaireId: string,
  loop: Loop,
): Promise<Response> {
  return instance.post(
    `/persistence/questionnaire/${questionnaireId}/loop`,
    loop,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
