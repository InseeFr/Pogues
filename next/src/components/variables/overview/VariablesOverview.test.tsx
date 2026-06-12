import userEvent from '@testing-library/user-event'

import { DatatypeType } from '@/models/datatype'
import { VariableType } from '@/models/variables'
import { renderWithRouter } from '@/testing/render'

import VariablesOverview from './VariablesOverview'

describe('VariablesOverview', () => {
  it('display variables and filter them', async () => {
    const user = userEvent.setup()

    const { getByRole, getByText, queryByText } = await renderWithRouter(
      <VariablesOverview
        questionnaireId="my-questionnaire"
        variables={[
          {
            id: 'my-id',
            name: 'MY_VAR',
            description: 'This var likes strawberries',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
        ]}
      />,
    )

    expect(getByText('MY_VAR')).toBeInTheDocument()

    await user.click(getByRole('button', { name: /External/i }))
    expect(queryByText('MY_VAR')).toBeNull()
  })

  it('display variables with scopes without scopeLabels ', async () => {
    const { getByText } = await renderWithRouter(
      <VariablesOverview
        questionnaireId="my-questionnaire"
        variables={[
          {
            id: 'my-id',
            name: 'MY_QUEST_VAR',
            description: 'This var likes strawberries',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
          {
            id: 'my-id-scope',
            name: 'MY_SCOPED_VAR',
            scope: 'my-scope',
            description: 'This var likes raspberry',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
        ]}
      />,
    )

    expect(getByText('MY_QUEST_VAR')).toBeInTheDocument()
    expect(getByText('MY_SCOPED_VAR')).toBeInTheDocument()
    expect(getByText('Scope my-scope')).toBeInTheDocument()
  })

  it('display variables with scopes with scopeLabel ', async () => {
    const { getByText } = await renderWithRouter(
      <VariablesOverview
        questionnaireId="my-questionnaire"
        variables={[
          {
            id: 'my-id',
            name: 'MY_QUEST_VAR',
            description: 'This var likes strawberries',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
          {
            id: 'my-id-scope',
            name: 'MY_SCOPED_VAR',
            scope: 'my-scope',
            description: 'This var likes raspberry',
            datatype: { typeName: DatatypeType.Text },
            type: VariableType.Collected,
          },
        ]}
        scopeLabels={new Map([['my-scope', 'My Label of my scope']])}
      />,
    )

    expect(getByText('MY_QUEST_VAR')).toBeInTheDocument()
    expect(getByText('MY_SCOPED_VAR')).toBeInTheDocument()
    expect(getByText('Scope Questionnaire')).toBeInTheDocument()
    expect(getByText('Scope My Label of my scope')).toBeInTheDocument()
  })
})
