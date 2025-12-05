import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('indicates whether a value is checked or not and allow to change it', async () => {
    // Given a Checkbox
    const user = userEvent.setup();
    render(<Checkbox />);

    // Then it can be clicked and is unchecked by default
    expect(screen.getByRole('checkbox')).toBeEnabled();
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    // When we click on the checkbox
    await user.click(screen.getByRole('checkbox'));

    // Then it is checked
    expect(screen.getByRole('checkbox')).toBeEnabled();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
