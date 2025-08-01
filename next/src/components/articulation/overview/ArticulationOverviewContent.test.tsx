import { expect } from 'vitest';

import { renderWithI18n } from '@/tests/tests';

import { ArticulationOverviewContent } from './ArticulationOverviewContent';

describe('ArticulationOverviewContent', () => {
  it('display articulation table label', () => {
    const { getByText } = renderWithI18n(<ArticulationOverviewContent />);

    expect(getByText(/Articulation table variables/i)).toBeInTheDocument();
  });
});
