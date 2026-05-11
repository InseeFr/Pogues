import { DatatypeType } from '@/models/datatype'
import { VariableType } from '@/models/variables'
import { renderWithRouter } from '@/testing/render'

import EditVariableLayout from './EditVariableLayout'

describe('EditVariableLayout', () => {
  it('displays title and children', async () => {
    const { getByText } = await renderWithRouter(
      <EditVariableLayout
        variable={{
          name: 'MY_VAR',
          id: 'id',
          type: VariableType.External,
          datatype: { typeName: DatatypeType.Boolean },
        }}
      >
        Hello world
      </EditVariableLayout>,
    )

    expect(getByText('Edit variable: MY_VAR')).toBeInTheDocument()
    expect(getByText('Hello world')).toBeInTheDocument()
  })
})
