import { renderWithRouter } from '@/testing/render';

import EditCodesListLayout from './EditCodesListLayout';

describe('EditCodesListLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <EditCodesListLayout codesList={{ label: 'my-cl', id: 'id', codes: [] }}>
        Hello world
      </EditCodesListLayout>,
    );

    expect(getByText('Edit the code list: my-cl')).toBeInTheDocument();
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
