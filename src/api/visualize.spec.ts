import { describe, expect, it, vi } from 'vitest';

import { downloadAsJson } from './utils';
import { VisualizationKind, getVisualization } from './visualize';

vi.mock('./utils', () => ({
  downloadAsJson: vi.fn(),
}));

describe('getVisualization', () => {
  it('should trigger download for PoguesModel visualization', async () => {
    const questionnaire = { id: '123', DataCollection: [], Name: 'Test' };
    const token = 'test-token';

    await getVisualization(
      VisualizationKind.PoguesModel,
      questionnaire,
      true,
      token,
    );

    expect(downloadAsJson).toHaveBeenCalledWith({
      data: questionnaire,
      filename: `pogues_${questionnaire.id}.json`,
    });
  });
});
