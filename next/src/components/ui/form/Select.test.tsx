import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from './Select';

describe('Select', () => {
  it('allow to select a value from a list of provided items and display selected value', async () => {
    // Given a Select with a 'my value 1'
    const user = userEvent.setup();
    render(<Select options={[{ label: 'my value 1', value: 'value-1' }]} />);

    expect(screen.getByRole('combobox')).toBeEnabled();
    expect(screen.queryByText('my value 1')).not.toBeInTheDocument();

    // When we click on the Select
    await user.click(screen.getByRole('combobox'));

    // Then a pop up oppens with 'my value 1' and we can select the 'my value 1'
    // value by clicking on it
    await screen.findByRole('listbox');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'my value 1' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'my value 1' }));

    expect(screen.getByRole('combobox')).toHaveTextContent('my value 1');
  });

  it('can have a default value', async () => {
    // Given a Select with a 'my value 1', where my value 1 is set as the
    // default value
    render(
      <Select
        options={[{ label: 'my value 1', value: 'value-1' }]}
        defaultValue={'value-1'}
      />,
    );

    // Then 'my value 1' is already selected
    expect(screen.getByRole('combobox')).toBeEnabled();
    expect(screen.getByText('my value 1')).toBeInTheDocument();
  });

  it('can be a controlled input', async () => {
    // Given a controlled Select with 'my value 1' and 'my value 2', where
    // 'my value 1' is the selected value
    const user = userEvent.setup();
    const foo = vi.fn();
    render(
      <Select
        onChange={foo}
        value="value-1"
        options={[
          { label: 'my value 1', value: 'value-1' },
          { label: 'my value 2', value: 'value-2' },
        ]}
      />,
    );

    expect(screen.getByRole('combobox')).toBeEnabled();
    expect(screen.getByText('my value 1')).toBeInTheDocument();

    // When we select the 'my value 2'
    await user.click(screen.getByRole('combobox'));
    await screen.findByRole('listbox');
    await user.click(screen.getByRole('option', { name: 'my value 1' }));

    // Then the onChange function is called with the new value
    expect(foo).toHaveBeenCalledExactlyOnceWith('value-1', expect.anything());
  });
});
