import { renderWithRouter } from '@/testing/render'

import QuestionnaireLine from './QuestionnaireLine'

describe('QuestionnaireLine', () => {
  it('display the main questionnaire information', async () => {
    const origDate = Date.prototype.toLocaleDateString
    vi.spyOn(Date.prototype, 'toLocaleDateString').mockImplementationOnce(
      function () {
        // @ts-expect-error vitest locale shenanigans
        return origDate.call(this, 'fr-FR')
      },
    )

    const { getByText } = await renderWithRouter(
      <QuestionnaireLine
        questionnaire={{
          id: 'my-id',
          label: 'My questionnaire',
          lastUpdatedDate: '2023-02-01T00:00:00.000Z',
          owner: 'my-owner',
          serie: {
            id: 'my-serie-id',
            uri: 'my-serie-uri',
            label: 'My serie label',
            altLabel: 'My serie alt label',
          },
        }}
      />,
    )

    expect(getByText('My questionnaire')).toBeInTheDocument()
    expect(getByText('My serie alt label')).toBeInTheDocument()
    expect(getByText('01/02/2023')).toBeInTheDocument()
  })

  it('displays a fallback when the series has a label but no alt label', async () => {
    const { getByText } = await renderWithRouter(
      <QuestionnaireLine
        questionnaire={{
          id: 'my-id',
          label: 'My questionnaire',
          lastUpdatedDate: '2023-02-01T00:00:00.000Z',
          owner: 'my-owner',
          serie: {
            id: 'my-serie-id',
            uri: 'my-serie-uri',
            label: 'My serie label',
          },
        }}
      />,
    )

    expect(getByText('Not available')).toBeInTheDocument()
  })

  it('displays a fallback when the series is missing', async () => {
    const { getByText } = await renderWithRouter(
      <QuestionnaireLine
        questionnaire={{
          id: 'my-id',
          label: 'My questionnaire',
          lastUpdatedDate: '2023-02-01T00:00:00.000Z',
          owner: 'my-owner',
        }}
      />,
    )

    expect(getByText('To be filled')).toBeInTheDocument()
  })
})
