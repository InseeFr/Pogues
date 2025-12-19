import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  it('allow to select one value from a list of provided items', async () => {
    // Given a RadioGroup with a 'my value 1' and 'my value 2'
    const user = userEvent.setup();
    render(
      <RadioGroup
        options={[
          { label: 'my value 1', value: 'value-1' },
          { label: 'my value 2', value: 'value-2' },
        ]}
      />,
    );

    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).toBeEnabled();
    expect(
      within(screen.getByText('my value 2')).getByRole('radio'),
    ).toBeEnabled();
    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).not.toBeChecked();
    expect(
      within(screen.getByText('my value 2')).getByRole('radio'),
    ).not.toBeChecked();

    // When we click on the first value
    await user.click(screen.getByText('my value 1'));

    // Then 'my value 1' is the only value checked
    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).toBeChecked();
    expect(
      within(screen.getByText('my value 2')).getByRole('radio'),
    ).not.toBeChecked();

    // When we click on the second value
    await user.click(screen.getByText('my value 2'));

    // Then 'my value 2' is the only value checked
    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).not.toBeChecked();
    expect(
      within(screen.getByText('my value 2')).getByRole('radio'),
    ).toBeChecked();
  });

  it('can have a default value', async () => {
    // Given a RadioGroup with a 'my value 1', where my value 1 is set as the
    // default value
    render(
      <RadioGroup
        options={[{ label: 'my value 1', value: 'value-1' }]}
        defaultValue={'value-1'}
      />,
    );

    // Then 'my value 1' is already selected
    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).toBeEnabled();
    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).toBeChecked();
  });

  it('can be a controlled input', async () => {
    // Given a controlled RadioGroup with 'my value 1' and 'my value 2', where
    // 'my value 1' is the selected value
    const user = userEvent.setup();
    const foo = vi.fn();
    render(
      <RadioGroup
        options={[
          { label: 'my value 1', value: 'value-1' },
          { label: 'my value 2', value: 'value-2' },
        ]}
        value="value-1"
        onValueChange={foo}
      />,
    );

    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).toBeEnabled();
    expect(
      within(screen.getByText('my value 2')).getByRole('radio'),
    ).toBeEnabled();
    expect(
      within(screen.getByText('my value 1')).getByRole('radio'),
    ).toBeChecked();

    // When we click on 'my value 2'
    await user.click(screen.getByText('my value 2'));

    // Then the onChange function is called with the new value
    expect(foo).toHaveBeenCalledExactlyOnceWith('value-2', expect.anything());
  });
});
