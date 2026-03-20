import {
  getCampaigns,
  getOperations,
  getSeries,
  getUnitsList,
} from '../api/metadata';
import { getNomenclature, getNomenclatures } from '../api/nomenclatures';
import { getQuestionnaire, getVariablesById } from '../api/questionnaires';
import { DIMENSION_LENGTH } from '../constants/pogues-constants';

const { NON_DYNAMIC } = DIMENSION_LENGTH;
export const LOAD_METADATA_SUCCESS = 'LOAD_METADATA_SUCCESS';
export const LOAD_METADATA_FAILURE = 'LOAD_METADATA_FAILURE';
const LOAD_SERIES = 'LOAD_SERIES';
const LOAD_UNITS = 'LOAD_UNITS';
const LOAD_OPERATIONS = 'LOAD_OPERATIONS';
const LOAD_CAMPAIGNS = 'LOAD_CAMPAIGNS';
const LOAD_EXTERNAL_ELEMENTS_VARIABLES = 'LOAD_EXTERNAL_ELEMENTS_VARIABLES';
const LOAD_EXTERNAL_ELEMENTS_LOOPS = 'LOAD_EXTERNAL_ELEMENTS_LOOPS';
const LOAD_NOMENCLATURES = 'LOAD_NOMENCLATURES';

export const loadMetadataSuccess = (type, metadata) => {
  const metadataByTypeStore = {};
  for (const metadatum of metadata) {
    metadataByTypeStore[metadatum.id] = metadatum;
  }

  return {
    type: LOAD_METADATA_SUCCESS,
    payload: {
      type,
      metadataByTypeStore,
    },
  };
};

export const loadMetadataFailure = (err) => ({
  type: LOAD_METADATA_FAILURE,
  payload: err,
});

// Metadata units

/**
 * Load units
 *
 * Asyc action that fetch the units list
 *
 * @return  {function}  Thunk which may dispatch LOAD_METADATA_SUCCESS or LOAD_METADATA_FAILURE
 */
export const loadUnits = (token) => (dispatch) => {
  dispatch({
    type: LOAD_UNITS,
    payload: null,
  });
  return getUnitsList(token)
    .then((listUnits) => {
      const units = listUnits
        .map((u) => ({
          id: u.uri,
          uri: u.uri,
          label: u.label,
        }))
        .sort((a, b) => {
          return `${a.label}`.localeCompare(b.label);
        });
      return dispatch(loadMetadataSuccess('units', units));
    })
    .catch((err) => dispatch(loadMetadataFailure(err)));
};

export const loadUnitsIfNeeded = (token) => (dispatch, getState) => {
  const state = getState();
  const { units } = state.metadataByType;
  if (!units) dispatch(loadUnits(token));
};

// Metadata series

export const loadSeries = (token) => (dispatch) => {
  dispatch({
    type: LOAD_SERIES,
    payload: null,
  });

  return getSeries(token)
    .then((series) => {
      const seriesMetadata = series.map((s) => ({
        id: s.id,
        value: s.id,
        label: s.label,
      }));
      return dispatch(loadMetadataSuccess('series', seriesMetadata));
    })
    .catch((err) => dispatch(loadMetadataFailure(err)));
};

export const loadSeriesIfNeeded = (token) => (dispatch, getState) => {
  const state = getState();
  const { series } = state.metadataByType;
  if (!series) dispatch(loadSeries(token));
};

// Metadata operations

export const loadOperations = (idSerie, token) => (dispatch) => {
  dispatch({
    type: LOAD_OPERATIONS,
    payload: null,
  });

  return getOperations(idSerie, token)
    .then((operations) => {
      const operationsMetadata = operations.map((o) => ({
        id: o.id,
        value: o.id,
        label: o.label,
        serie: o.parent,
      }));
      return dispatch(loadMetadataSuccess('operations', operationsMetadata));
    })
    .catch((err) => dispatch(loadMetadataFailure(err)));
};

export const loadOperationsIfNeeded =
  (token, idSerie = '') =>
  (dispatch, getState) => {
    const state = getState();
    const operations = state.metadataByType.operations || {};
    const operationsBySerie = Object.keys(operations).reduce((acc, key) => {
      const operation = operations[key];
      return operation.serie === idSerie ? { ...acc, [key]: operation } : acc;
    }, {});

    if (idSerie !== '' && Object.keys(operationsBySerie).length === 0)
      dispatch(loadOperations(idSerie, token));
  };

// Metadata campaigns

export const loadCampaigns = (idOperation, token) => (dispatch) => {
  dispatch({
    type: LOAD_CAMPAIGNS,
    payload: null,
  });

  return getCampaigns(idOperation, token)
    .then((campaigns) => {
      const campaignsMetadata = campaigns.map((c) => ({
        id: c.id,
        value: c.id,
        label: c.label,
        operation: c.parent,
      }));
      return dispatch(loadMetadataSuccess('campaigns', campaignsMetadata));
    })
    .catch((err) => dispatch(loadMetadataFailure(err)));
};

export const loadCampaignsIfNeeded =
  (idOperation, token) => (dispatch, getState) => {
    const state = getState();
    const campaigns = state.metadataByType.campaigns || {};
    const campaignsByOperation = Object.keys(campaigns).reduce((acc, key) => {
      const campaign = campaigns[key];
      return campaign.operation === idOperation
        ? { ...acc, [key]: campaign }
        : acc;
    }, {});

    if (idOperation !== '' && Object.keys(campaignsByOperation).length === 0)
      dispatch(loadCampaigns(idOperation, token));
  };

// Metadata : variables from external elements

export const loadExternalQuestionnairesVariables =
  (idExternalQuestionnaire, token) => async (dispatch) => {
    dispatch({
      type: LOAD_EXTERNAL_ELEMENTS_VARIABLES,
      payload: null,
    });

    try {
      const externalQuestionnaireVariables = await getVariablesById(
        idExternalQuestionnaire,
        token,
      );
      const externalQuestionnairesMetadata = [
        {
          id: idExternalQuestionnaire,
          variables: externalQuestionnaireVariables.Variable,
        },
      ];
      return dispatch(
        loadMetadataSuccess(
          'externalQuestionnairesVariables',
          externalQuestionnairesMetadata,
        ),
      );
    } catch (err) {
      return dispatch(loadMetadataFailure(err));
    }
  };

// Metadata : loops from external elements

const isQuestionLoop = (component) => {
  return (
    component.type === 'QuestionType' &&
    ((component.questionType === 'TABLE' &&
      component.ResponseStructure.Dimension.some(
        (dim) =>
          dim.dimensionType === 'PRIMARY' &&
          dim.dynamic !== '0' &&
          dim.dynamic !== NON_DYNAMIC,
      )) ||
      component.questionType === 'PAIRING')
  );
};

export const loadExternalQuestionnairesLoops =
  (idExternalQuestionnaire, token) => async (dispatch) => {
    dispatch({
      type: LOAD_EXTERNAL_ELEMENTS_LOOPS,
      payload: null,
    });

    try {
      const externalQuestionnaire = await getQuestionnaire(
        idExternalQuestionnaire,
        token,
      );
      const externalQuestionnaireQuestionLoops =
        externalQuestionnaire.Child.reduce((accQuest, sequence) => {
          const sequenceContent = Object.values(sequence.Child).reduce(
            (acc, component) => {
              if (isQuestionLoop(component))
                return [...acc, { id: component.id, name: component.Name }];
              if (
                component.type === 'sequenceType' &&
                component.genericName === 'SUBMODULE'
              ) {
                return Object.values(component.Child).reduce(
                  (subacc, subcomponent) => {
                    if (isQuestionLoop(subcomponent))
                      return [
                        ...subacc,
                        {
                          id: subcomponent.id,
                          name: subcomponent.Name,
                        },
                      ];
                    return subacc;
                  },
                  [],
                );
              }
              return acc;
            },
            [],
          );
          return [...accQuest, ...sequenceContent];
        }, []);
      const externalQuestionnaireLoops =
        externalQuestionnaire.Iterations?.Iteration.filter(
          (loop) => !loop.IterableReference,
        ).map((loop) => ({ id: loop.id, name: loop.Name }));

      const externalQuestionnairesMetadata = [
        {
          id: idExternalQuestionnaire,
          loops: [
            ...externalQuestionnaireQuestionLoops,
            ...externalQuestionnaireLoops,
          ],
        },
      ];
      return dispatch(
        loadMetadataSuccess(
          'externalQuestionnairesLoops',
          externalQuestionnairesMetadata,
        ),
      );
    } catch (err) {
      return dispatch(loadMetadataFailure(err));
    }
  };

export const loadExternalQuestionnairesIfNeeded =
  (idExternalQuestionnaire, token) => (dispatch, getState) => {
    const state = getState();
    if (
      !state.metadataByType.externalQuestionnairesVariables
        ?.idExternalQuestionnaire
    )
      dispatch(
        loadExternalQuestionnairesVariables(idExternalQuestionnaire, token),
      );
    if (
      !state.metadataByType.externalQuestionnairesLoops?.idExternalQuestionnaire
    )
      dispatch(loadExternalQuestionnairesLoops(idExternalQuestionnaire, token));
  };

// Metadata : Nomenclatures

export const loadNomenclatures = (token) => async (dispatch) => {
  dispatch({
    type: LOAD_NOMENCLATURES,
    payload: null,
  });

  try {
    const nomenclatures = await getNomenclatures(token);
    const nomenclaturesMetadata = Object.values(nomenclatures.nomenclatures)
      .map((nomenclature) => ({
        id: nomenclature.id,
        label: nomenclature.label,
      }))
      .sort((a, b) => {
        return `${a.label}`.localeCompare(b.label);
      });
    return dispatch(
      loadMetadataSuccess('nomenclatures', nomenclaturesMetadata),
    );
  } catch (err) {
    return dispatch(loadMetadataFailure(err));
  }
};

export const loadNomenclaturesIfNeeded = (token) => (dispatch, getState) => {
  const state = getState();
  const { nomenclatures } = state.metadataByType;
  if (!nomenclatures) dispatch(loadNomenclatures(token));
};

export const loadNomenclature =
  (token, id, nomenclatures) => async (dispatch) => {
    dispatch({
      type: LOAD_NOMENCLATURES,
      payload: null,
    });

    try {
      const nomenclature = await getNomenclature(id, token);
      const nomenclaturesMetadata = Object.values({
        ...nomenclatures,
        [id]: {
          id,
          name: nomenclature.name,
          label: nomenclature.label,
          urn: nomenclature.urn,
          suggesterParameters: nomenclature.parameters,
          codes: nomenclature.codes,
        },
      });
      return dispatch(
        loadMetadataSuccess('nomenclatures', nomenclaturesMetadata),
      );
    } catch (err) {
      return dispatch(loadMetadataFailure(err));
    }
  };
