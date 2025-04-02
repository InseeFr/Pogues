import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('Button', () => {
  it('trigger onClick when label is clicked', async () => {
    const user = userEvent.setup();
    const foo = vi.fn();
    render(<Button onClick={foo}>Mon bouton</Button>);

    expect(screen.getByRole('button', { name: /Mon bouton/i })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: /Mon bouton/i }));
    expect(foo).toHaveBeenCalledOnce();
  });

  it('cannot be clicked when disabled', async () => {
    const user = userEvent.setup();
    const foo = vi.fn();
    render(
      <Button onClick={foo} disabled={true}>
        Mon bouton
      </Button>,
    );

    expect(screen.getByRole('button', { name: /Mon bouton/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /Mon bouton/i }));
    expect(foo).not.toHaveBeenCalledOnce();
  });

  it('cannot be clicked when loading', async () => {
    const user = userEvent.setup();
    const foo = vi.fn();
    render(
      <Button onClick={foo} isLoading={true}>
        Mon bouton
      </Button>,
    );

    expect(screen.getByRole('button', { name: /Mon bouton/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /Mon bouton/i }));
    expect(foo).not.toHaveBeenCalledOnce();
  });
});
