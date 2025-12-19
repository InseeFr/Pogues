import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NumberField from './NumberField';

describe('NumberField', () => {
  it('allow to type a value', async () => {
    // Given a NumberField
    const user = userEvent.setup();
    render(<NumberField />);

    expect(screen.getByRole('textbox')).toBeEnabled();
    expect(screen.queryByText('123')).not.toBeInTheDocument();

    // When we click on the input and type something
    await user.click(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '123');

    // Then the value is set
    expect(screen.getByRole('textbox')).toHaveValue('123');

    // When we click on '+'
    await user.click(screen.getByRole('button', { name: 'Increase' }));

    // Then the value is increased
    expect(screen.getByRole('textbox')).toHaveValue('124');

    // When we click on '-'
    await user.click(screen.getByRole('button', { name: 'Decrease' }));

    // Then the value is decreased
    expect(screen.getByRole('textbox')).toHaveValue('123');
  });

  it('can have a default value', async () => {
    // Given a number field where 123 is set as the default value
    render(<NumberField defaultValue={123} />);

    // Then 123 is already typed
    expect(screen.getByRole('textbox')).toHaveValue('123');
  });

  it('can be a controlled input', async () => {
    // Given a controlled NumberField where 123 is the value
    const user = userEvent.setup();
    const foo = vi.fn();
    render(<NumberField onValueChange={foo} value={123} />);

    expect(screen.getByRole('textbox')).toBeEnabled();
    expect(screen.getByRole('textbox')).toHaveValue('123');

    // When we type '4'
    await user.click(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '4');

    // Then the onChange function is called with the new value
    expect(foo).toHaveBeenCalledExactlyOnceWith(1234, expect.anything());
  });
});
