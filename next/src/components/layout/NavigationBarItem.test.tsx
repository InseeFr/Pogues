import { render } from '@testing-library/react';
import { expect } from 'vitest';

import NavigationBarItem from './NavigationBarItem';

describe('NavigationBarItem', () => {
  it('display label', () => {
    const { getByText } = render(
      <NavigationBarItem
        icon={null}
        label="my navigation item"
        active={false}
      />,
    );

    expect(getByText(/my navigation item/i)).toBeInTheDocument();
  });

  it('is accessible when active', () => {
    const { getByText } = render(
      <NavigationBarItem icon={null} label="my navigation item" active />,
    );

    expect(getByText(/my navigation item/i).parentElement).toHaveAttribute(
      'aria-current',
    );
  });
});
