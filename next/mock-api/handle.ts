import type { IncomingMessage, ServerResponse } from 'node:http'

import {
  FAKE_STAMP,
  findQuestionnaire,
  store,
  type MockQuestionnaire,
} from './store.ts'

type MockResult = { status: number; body?: unknown }

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

async function parseJson(req: IncomingMessage): Promise<unknown> {
  const raw = await readBody(req)
  if (!raw) return undefined
  return JSON.parse(raw)
}

function match(
  method: string,
  pathname: string,
  pattern: string,
): Record<string, string> | null {
  if (method !== pattern.slice(0, pattern.indexOf(' '))) return null
  const pathPattern = pattern.slice(pattern.indexOf(' ') + 1)
  const patternParts = pathPattern.split('/')
  const pathParts = pathname.split('/')
  if (patternParts.length !== pathParts.length) return null
  const params: Record<string, string> = {}
  for (let i = 0; i < patternParts.length; i++) {
    const expected = patternParts[i]!
    const actual = pathParts[i]!
    if (expected.startsWith(':')) {
      params[expected.slice(1)] = decodeURIComponent(actual)
    } else if (expected !== actual) {
      return null
    }
  }
  return params
}

export async function handleMockApi(
  req: IncomingMessage,
  url: URL,
): Promise<MockResult | null> {
  const method = (req.method ?? 'GET').toUpperCase()
  const { pathname, searchParams } = url

  const isApi =
    pathname.startsWith('/persistence/') ||
    pathname.startsWith('/metadata/') ||
    pathname.startsWith('/agencies') ||
    pathname.startsWith('/questionnaires/')
  if (!isApi) return null

  let params: Record<string, string> | null

  if ((params = match(method, pathname, 'GET /persistence/questionnaires/stamps'))) {
    return { status: 200, body: store.stamps }
  }

  if (
    (params = match(method, pathname, 'GET /persistence/questionnaires/search/meta'))
  ) {
    const owner = searchParams.get('owner') ?? FAKE_STAMP
    return {
      status: 200,
      body: store.questionnaires.filter((q) => q.owner === owner),
    }
  }

  if ((params = match(method, pathname, 'GET /persistence/questionnaire/:id'))) {
    const q = findQuestionnaire(params.id!)
    return q ? { status: 200, body: q } : { status: 404, body: { error: 'not found' } }
  }

  if ((params = match(method, pathname, 'POST /persistence/questionnaires'))) {
    const body = (await parseJson(req)) as MockQuestionnaire
    const created: MockQuestionnaire = {
      ...body,
      id: body.id || `q-${crypto.randomUUID().slice(0, 8)}`,
      lastUpdatedDate: new Date().toISOString(),
      owner: body.owner || FAKE_STAMP,
    }
    store.questionnaires.push(created)
    store.details[created.id] = {
      id: created.id,
      name: created.Name,
      label: created.Label?.[0] ?? created.Name,
      flowLogic: created.flowLogic ?? 'FILTER',
      formulasLanguage: created.formulasLanguage ?? 'VTL',
      targetMode: created.TargetMode ?? [],
      agency: created.agency ?? 'fr.insee',
      owner: created.owner,
      dataCollection: { serie: store.serieDetails['serie-demo'] },
    }
    store.variables[created.id] = []
    store.codesLists[created.id] = []
    store.scopes[created.id] = []
    store.versions[created.id] = []
    store.nomenclatures[created.id] = []
    return { status: 201, body: created }
  }

  if ((params = match(method, pathname, 'PUT /persistence/questionnaire/:id'))) {
    const body = (await parseJson(req)) as MockQuestionnaire
    const idx = store.questionnaires.findIndex((q) => q.id === params!.id)
    if (idx === -1) return { status: 404, body: { error: 'not found' } }
    store.questionnaires[idx] = {
      ...store.questionnaires[idx],
      ...body,
      id: params.id!,
      lastUpdatedDate: new Date().toISOString(),
    }
    return { status: 200, body: store.questionnaires[idx] }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/details',
    ))
  ) {
    return {
      status: 200,
      body: store.details[params.id!] ?? {
        id: params.id,
        name: 'UNKNOWN',
        label: 'Unknown',
        flowLogic: 'FILTER',
        formulasLanguage: 'VTL',
        targetMode: [],
        agency: 'fr.insee',
        owner: FAKE_STAMP,
      },
    }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/version/:versionId/details',
    ))
  ) {
    return {
      status: 200,
      body: store.details[params.id!] ?? {},
    }
  }

  if (
    (params = match(
      method,
      pathname,
      'PUT /persistence/questionnaire/:id/details',
    ))
  ) {
    store.details[params.id!] = await parseJson(req)
    return { status: 200, body: { status: 'ok' } }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/variables',
    ))
  ) {
    return { status: 200, body: store.variables[params.id!] ?? [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/version/:versionId/variables',
    ))
  ) {
    return { status: 200, body: store.variables[params.id!] ?? [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/articulation/variables',
    ))
  ) {
    return { status: 200, body: [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'POST /persistence/questionnaire/:id/variable',
    ))
  ) {
    const body = (await parseJson(req)) as { id?: string }
    const list = store.variables[params.id!] ?? (store.variables[params.id!] = [])
    const variable = { ...body, id: body.id || `var-${crypto.randomUUID().slice(0, 8)}` }
    list.push(variable)
    return { status: 201, body: variable }
  }

  if (
    (params = match(
      method,
      pathname,
      'DELETE /persistence/questionnaire/:id/variable/:variableId',
    ))
  ) {
    const list = store.variables[params.id!] ?? []
    store.variables[params.id!] = list.filter((v) => (v as { id: string }).id !== params!.variableId)
    return { status: 204 }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/codes-lists',
    ))
  ) {
    return { status: 200, body: store.codesLists[params.id!] ?? [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/version/:versionId/codes-lists',
    ))
  ) {
    return { status: 200, body: store.codesLists[params.id!] ?? [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'PUT /persistence/questionnaire/:id/codes-list/:codesListId',
    ))
  ) {
    const body = await parseJson(req)
    const list = store.codesLists[params.id!] ?? (store.codesLists[params.id!] = [])
    const idx = list.findIndex((c) => (c as { id: string }).id === params!.codesListId)
    if (idx >= 0) list[idx] = body
    else list.push(body)
    return { status: 201, body }
  }

  if (
    (params = match(
      method,
      pathname,
      'DELETE /persistence/questionnaire/:id/codes-list/:codesListId',
    ))
  ) {
    const list = store.codesLists[params.id!] ?? []
    store.codesLists[params.id!] = list.filter(
      (c) => (c as { id: string }).id !== params!.codesListId,
    )
    return { status: 204 }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/variables-scopes',
    ))
  ) {
    return { status: 200, body: store.scopes[params.id!] ?? [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/versions',
    ))
  ) {
    return { status: 200, body: store.versions[params.id!] ?? [] }
  }

  if (
    (params = match(method, pathname, 'POST /persistence/questionnaire/restore/:versionId'))
  ) {
    return { status: 200, body: { status: 'ok' } }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/multimode',
    ))
  ) {
    return { status: 200, body: store.multimode[params.id!] ?? null }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/version/:versionId/multimode',
    ))
  ) {
    return { status: 200, body: store.multimode[params.id!] ?? null }
  }

  if (
    (params = match(
      method,
      pathname,
      'PUT /persistence/questionnaire/:id/multimode',
    ))
  ) {
    store.multimode[params.id!] = await parseJson(req)
    return { status: 200, body: store.multimode[params.id!] }
  }

  if (
    (params = match(
      method,
      pathname,
      'DELETE /persistence/questionnaire/:id/multimode',
    ))
  ) {
    delete store.multimode[params.id!]
    return { status: 204 }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/articulation',
    ))
  ) {
    return { status: 200, body: store.articulation[params.id!] ?? null }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /persistence/questionnaire/:id/version/:versionId/articulation',
    ))
  ) {
    return { status: 200, body: store.articulation[params.id!] ?? null }
  }

  if (
    (params = match(
      method,
      pathname,
      'PUT /persistence/questionnaire/:id/articulation',
    ))
  ) {
    store.articulation[params.id!] = await parseJson(req)
    return { status: 200, body: store.articulation[params.id!] }
  }

  if (
    (params = match(
      method,
      pathname,
      'DELETE /persistence/questionnaire/:id/articulation',
    ))
  ) {
    delete store.articulation[params.id!]
    return { status: 204 }
  }

  if ((params = match(method, pathname, 'GET /agencies'))) {
    return { status: 200, body: store.agencies }
  }

  if ((params = match(method, pathname, 'GET /metadata/series'))) {
    return { status: 200, body: store.series }
  }

  if ((params = match(method, pathname, 'GET /metadata/series/:serieId'))) {
    return {
      status: 200,
      body: store.serieDetails[params.serieId!] ?? store.series,
    }
  }

  if (
    (params = match(method, pathname, 'GET /questionnaires/:id/nomenclatures'))
  ) {
    return { status: 200, body: store.nomenclatures[params.id!] ?? [] }
  }

  if (
    (params = match(
      method,
      pathname,
      'GET /questionnaires/:id/version/:versionId/nomenclatures',
    ))
  ) {
    return { status: 200, body: store.nomenclatures[params.id!] ?? [] }
  }

  // Unhandled API route → soft success so the shell UI does not hard-fail
  console.warn(`[mock-api] unhandled ${method} ${pathname}`)
  if (method === 'DELETE') return { status: 204 }
  if (method === 'GET') return { status: 200, body: [] }
  return { status: 200, body: { status: 'ok' } }
}

export function sendMockResult(res: ServerResponse, result: MockResult): void {
  res.statusCode = result.status
  res.setHeader('Content-Type', 'application/json')
  if (result.status === 204 || result.body === undefined) {
    res.end()
    return
  }
  res.end(JSON.stringify(result.body))
}
