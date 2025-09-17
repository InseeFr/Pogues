import { render } from '@testing-library/react';

import CodeLine from './CodeLine';

it('CodeLine correctly displays code and subcode informations', () => {
  const { getByText } = render(
    <CodeLine
      code={{
        value: 'my-code',
        label: 'my-label',
        codes: [{ value: 'my-sub-code', label: 'my-sub-label' }],
      }}
    />,
  );

  expect(getByText('my-code')).toBeInTheDocument();
  expect(getByText('my-label')).toBeInTheDocument();
  expect(getByText('my-sub-code')).toBeInTheDocument();
  expect(getByText('my-sub-label')).toBeInTheDocument();
});
