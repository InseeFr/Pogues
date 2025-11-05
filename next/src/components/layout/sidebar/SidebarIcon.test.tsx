import { render } from '@testing-library/react';

import SidebarIcon from './SidebarIcon';

describe('SidebarIcon', () => {
  it('displays label', () => {
    const { getByText } = render(
      <SidebarIcon
        Icon={() => <svg />}
        label="my navigation item"
        active={false}
      />,
    );

    expect(getByText(/my navigation item/i)).toBeInTheDocument();
  });

  it('has the "aria-current" attribute when active', () => {
    const { getByText } = render(
      <SidebarIcon Icon={() => <svg />} label="my navigation item" active />,
    );

    expect(getByText(/my navigation item/i).parentElement).toHaveAttribute(
      'aria-current',
    );
  });
});
