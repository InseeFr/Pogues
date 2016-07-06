/*
This module should stay as much as possible ignorant of the inner workings of
the API, and especially the shape of the returned objects.
Yet, it does not seem relevant to return raw responses objects to the reducer. The option chosen consists of returning javascript objects extracted from headers or response body, but not processing them.
*/
import fetch from 'isomorphic-fetch'
import config from '../config/config'
import Logger from '../logger/logger'
import { nameFromLabel } from './name-utils'

var logger = new Logger('RemoteApi', 'Remote')

const {
  baseURL, persistPath, stromaePath,
  codeLists: { repoURLSpecs, repoURLCList }
} = config

const urlGetQuestionnaire         = baseURL + persistPath + '/questionnaire'
const urlPostQuestionnaire        = baseURL + persistPath + '/questionnaire'
const urlPutQuestionnaire         = baseURL + persistPath + '/questionnaire'
const urlDeleteQuestionnaire      = baseURL + persistPath + '/questionnaire'
const urlGetQuestionnaireList     = baseURL + persistPath + '/questionnaires'
const urlStromaePostQuestionnaire = baseURL + stromaePath
//TODO ivestigate repo API
const urlGetSpecs                 = repoURLSpecs
const urlGetCList                 = repoURLCList

/**
 * Questionnaire List
 * path like '/questionnaires'
 */

export const getQuestionnaireList = () =>
  fetch(urlGetQuestionnaireList, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(res => res.json())


/**
 * Questionnaire
 * path like '/questionnaire'
 */

export const postQuestionnaire = qr =>
 fetch(urlPostQuestionnaire, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(qr)
  }).then(res => {
      // TODO check in header slug is the same as qr._id
      if (res.ok) return res.headers.get('location')
      else throw new Error('Network request failed :' + res.statusText)
  })

//TODO better use of fetch API (use of `new Request(...)` instead of building
//a string with the url)
export const putQuestionnaire = (id, qr) =>
  fetch(urlPutQuestionnaire + '/' + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(qr)
  }).then(res => {
      if (res.ok) return res
      else throw new Error('Network request failed :' + res.statusText)
    })

export const deleteQuestionnaire = id =>
  fetch(urlDeleteQuestionnaire + '/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    if (res.ok) return res
    else throw new Error('Network request failed :' + res.statusText)
  })
/**
 * Publish questionnaire
 * path like '/publisher/questionnaire'
 */
export const stromaePostQuestionnaire = serializedQuestionnaire => {
  const start = new Date().getTime();
  return fetch(urlStromaePostQuestionnaire, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(serializedQuestionnaire)
    }).then(res => {
      if (res.ok) {
        var end = new Date().getTime();
        var execTimeSec = (end - start) / 1000;
        logger.debug('Response timing : ', execTimeSec, ' sec');
        return res.headers.get('location')
      }
      else throw new Error('Network request failed :' + res.statusText)
    })
  }

/**
 * Retrieve questionnaire
 * path like '/pogues/questionnaire:id'
 */
export const getQuestionnaire = id =>
  fetch(urlGetQuestionnaire + '/' + id, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => res.json())

/**
 * Retrieve code list specifications
 */
export const getCodeListSpecs = () =>
  fetch(urlGetSpecs, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => res.json())

/**
 * Retrieve code list
 */
export const getCodeList = retrievalQuery =>
  fetch(urlGetCList + '/' + retrievalQuery, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => res.json())
