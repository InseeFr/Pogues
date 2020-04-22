import * as ResponseFormat from './response-format';
import * as Declaration from './declaration';
import * as Control from './control';
import * as Redirection from './redirection';
import * as Response from './response';
import { uuid } from 'utils/utils';
import * as CollectedVariable from './collected-variable';

import {
  COMPONENT_TYPE,
  SEQUENCE_TYPE_NAME,
  QUESTION_TYPE_NAME,
  QUESTION_TYPE_ENUM,
} from 'constants/pogues-constants';
import { checkPropTypes } from 'prop-types';

const { QUESTION, SEQUENCE, SUBSEQUENCE, QUESTIONNAIRE } = COMPONENT_TYPE;

function sortByWeight(store) {
  return (keyA, keyB) => {
    if (store[keyA].weight < store[keyB].weight) return -1;
    if (store[keyA].weight > store[keyB].weight) return 1;
    return 0;
  };
}
function getResponseCoordinate(variablesMapping = []) {
  return variablesMapping.reduce((acc, m) => {
    const axis = m.MappingTarget.split(' ');
    return {
      ...acc,
      [m.MappingSource]: {
        x: parseInt(axis[0], 10),
        y: parseInt(axis[1], 10),
      },
    };
  }, {});
}

function getResponsesByVariable(responses = [], coordinatesByResponse = []) {
  return responses.reduce((accInner, response) => {
    const {
      id: responseId,
      CollectedVariableReference: collectedVariableId,
    } = response;
    // Mapping only exists in the questions with a matrix of responses
    const coordinates = coordinatesByResponse[responseId] || {};

    return {
      ...accInner,
      [collectedVariableId]: {
        ...coordinates,
      },
    };
  }, {});
}
function clarificationQuestion(Children){
  const Clarification = [];
  const childr = Children.filter(children => children.Child.length != 0);
        childr.forEach(item =>{
          item.Child.forEach(clar =>
            {
            if (clar.type === "SequenceType") {
              clar.Child.forEach( supseq => {
                if((supseq.questionType === "SINGLE_CHOICE" || 
                  supseq.questionType === "MULTIPLE_CHOICE" || 
                  supseq.questionType === "TABLE") &&
                  supseq.ClarificationQuestion !== undefined && 
                  supseq.ClarificationQuestion.length !== 0)
                    {
                      Clarification.push(supseq);
                    }
              })
            }
            else {
              if((clar.questionType === "SINGLE_CHOICE" || 
                  clar.questionType === "MULTIPLE_CHOICE" || 
                  clar.questionType === "TABLE") &&
                  clar.ClarificationQuestion !== undefined && 
                  clar.ClarificationQuestion.length !== 0)
              {
                Clarification.push(clar);
              }  
            }

            });
        });
  return Clarification;
}

export function getClarificarionfromremote(Children) {
  const variableClarification = [];
  const childclarification = clarificationQuestion(Children);
          childclarification.forEach(element => {
            element.ClarificationQuestion.forEach(item =>{ 
              const position = element.FlowControl.find( controle => controle.IfTrue === item.id).Expression;
                if(position) {
                  const stringFind = position.substring(
                    position.lastIndexOf("=") + 3, 
                    position.lastIndexOf("'")
                  );
                  const multiplFind = position.substring(
                  1, 
                  position.lastIndexOf("$")
                  ).replace(element.Name,'');
                  const codelistid = element.questionType === "MULTIPLE_CHOICE" || element.questionType == "TABLE" ? element.ResponseStructure.Dimension[0].CodeListReference: element.Response[0].CodeListReference;
                  const variable = {
                    responseclar : item,
                    position: element.questionType === "MULTIPLE_CHOICE" ? multiplFind : stringFind,
                    codelistid: codelistid,
                    type: element.questionType
                  };
                  variableClarification.push(variable);
                }
            });
          });
  return variableClarification;
}

function remoteToVariableResponseNested(children = [], acc = {}) {
  children.forEach(child => {
    const {
      Response: responses,
      ClarificationQuestion: responsesClarification,
      ResponseStructure: responseStructure,
      Child: childrenInner,
    } = child;
    let responseFinal =  responses;
    if ( responsesClarification != undefined ){
      responsesClarification.forEach(clar => {
        responseFinal = responseFinal.concat(clar.Response);
      });
    }
   
    const variableResponseMapping = responseStructure
      ? responseStructure.Mapping
      : undefined;
    const coordinatesByResponse = getResponseCoordinate(
      variableResponseMapping,
    );

    acc = {
      ...acc,
      ...getResponsesByVariable(responseFinal, coordinatesByResponse),
      ...remoteToVariableResponseNested(childrenInner, acc),
    };
  });
  return acc;
}
export function remoteToVariableResponse(remote) {
  
  return remoteToVariableResponseNested(remote.Child);
}

function remoteToState(remote, componentGroup, codesListsStore) {
  const {
    id,
    questionType,
    genericName,
    Name: name,
    Label: [label],
    Declaration: declarations,
    // Trello #196 : ouput : GoTo --> FlowControl
    FlowControl: redirections,
    Control: controls,
    Response: responses,
    ClarificationQuestion: responsesClarification,
    ResponseStructure: responseStructure,
    Child: children,
    parent,
    weight,
    TargetMode,
    declarationMode,
  } = remote;
  const redirectionClar = redirections != undefined ? redirections.filter(redirec =>  redirec.flowControlType === undefined) : [];
  let responseFinal =  responses;
  if ( responsesClarification != undefined ){
    responsesClarification.forEach(clar => {
      responseFinal = responseFinal.concat(clar.Response);
    });
  }
  const state = {
    id,
    name,
    parent: parent || '',
    weight: weight || 0,
    children: children ? children.map(child => child.id) : [],
    declarations: Declaration.remoteToState(declarations),
    controls: Control.remoteToState(controls),
    redirections: Redirection.remoteToState(redirectionClar),
    TargetMode: TargetMode || declarationMode || [],
    responsesClarification,
  };

  if (genericName) {
    state.label = label;
    if (genericName === QUESTIONNAIRE) {
      state.type = QUESTIONNAIRE;
    } else if (genericName === 'MODULE') {
      state.type = SEQUENCE;
    } else if (genericName === 'SUBMODULE') {
      state.type = SUBSEQUENCE;
    }
  } else {
    const dimensions = responseStructure ? responseStructure.Dimension : [];

    state.type = QUESTION;
    state.label = label.replace(/&#xd;/gi, '\n\n');
    state.responseFormat = ResponseFormat.remoteToState(
      questionType,
      responses,
      dimensions,
      codesListsStore,
    );
    state.collectedVariables = CollectedVariable.remoteToComponentState(
      responseFinal,
    );
  }
  const cGroupIndex = componentGroup.findIndex(
    group => group.MemberReference && group.MemberReference.indexOf(id) >= 0,
  );
  const cGroup = componentGroup[cGroupIndex];
  state.pageBreak =
    cGroup &&
    cGroupIndex < componentGroup.length - 1 &&
    cGroup.MemberReference.indexOf(id) === cGroup.MemberReference.length - 1;
  return state;
}

function remoteToStoreNested(
  children,
  parent,
  componentGroup,
  codesListsStore = {},
  acc = {},
) {

  let weight = 0;
  children.forEach(child => {
    acc[child.id] = remoteToState(
      { ...child, weight, parent },
      componentGroup,
      codesListsStore,
    );
    weight += 1;
    if (child.Child)
      remoteToStoreNested(
        child.Child,
        child.id,
        componentGroup,
        codesListsStore,
        acc,
      );
    return acc;
  });
  return acc;
}

function getClarificationresponseSingleChoiseQuestion(collectedVariablesStore, collectedVariables, codesListsStore, responseFormat, FlowControl, TargetMode, Name){
  let ClarificationQuestion= [];
  let collectedvariablequestion = [];
  let flowcontrolefinal = [];
  Object.values(collectedVariablesStore).forEach(collec => {
   if (collectedVariables != undefined){
    collectedVariables.forEach(variables =>{
      if(collec.id === variables ){
        collectedvariablequestion.push(collec);
      }
    });
   }
  });
  FlowControl.forEach(flowcon => {
    if(flowcon.flowControlType === undefined){
      flowcontrolefinal.push(flowcon);
    }
  });
  collectedvariablequestion.forEach(function(collected) {
    const code = Object.values(codesListsStore[responseFormat.SINGLE_CHOICE.CodesList.id].codes).find(code => code.weight === collected.z);
    if (code) {
      let clafication = {
        id: uuid(),
        questionType: QUESTION_TYPE_ENUM.SIMPLE,
        Name: code.precisionid,
        Label: code.precisionlabel,
        TargetMode: TargetMode,
        Response: [
          Response.stateToRemote({
            mandatory : false,
            typeName: collected.type,
            maxLength: collected.TEXT.maxLength,
            pattern: '',
            collectedVariable: collected.id,
          }),
        ],
      };
      ClarificationQuestion.push(clafication);
      const clarficationredirection = {
        id: uuid(),
        label:  `$${collectedvariablequestion[0].name}$ = '${code.value}' : ${collected.name}`,
        condition: `$${collectedvariablequestion[0].name}$ = '${code.value}'`,
        cible: clafication.id,
        flowControlType : "CLARIFICATION",
       };
      const clarficationredirectionid = clarficationredirection.id;
      const flow = Redirection.stateToRemote({[clarficationredirectionid] : clarficationredirection});
      flowcontrolefinal.push(flow[0]);
    }
  });
  return {
    flowcontrolefinal,
    ClarificationQuestion
  }
}

function getClarificationResponseMultipleChoiceQuestion(collectedVariablesStore, collectedVariables, codesListsStore, responseFormat, FlowControl, TargetMode, Name){
  let ClarificationQuestion= [];
  let collectedvariablequestion = [];
  let flowcontrolefinal = [];
  Object.values(collectedVariablesStore).forEach(collec => {
   if (collectedVariables != undefined){
    collectedVariables.forEach(variables =>{
      if(collec.id === variables ){
        collectedvariablequestion.push(collec);
      }
    });
   }
  });
  FlowControl.forEach(flowcon => {
    if(flowcon.flowControlType === undefined){
      flowcontrolefinal.push(flowcon);
    }
  });
  collectedvariablequestion.forEach(function(collected) {
    if(responseFormat.MULTIPLE_CHOICE.PRIMARY.CodesList)   {
      const code = Object.values(codesListsStore[responseFormat.MULTIPLE_CHOICE.PRIMARY.CodesList.id].codes).find(code => code.weight === collected.z);
      if (!collected.codeListReference && code) {
        const collectedVar =  collectedvariablequestion.find(collectedVarible=> collectedVarible.x == code.weight)
        let clafication = {
          id: uuid(),
          questionType: QUESTION_TYPE_ENUM.SIMPLE,
          Name: code.precisionid,
          Label: code.precisionlabel,
          TargetMode: TargetMode,
          Response: [
            Response.stateToRemote({
              mandatory : false,
              typeName: collected.type,
              maxLength: collected.TEXT.maxLength,
              pattern: '',
              collectedVariable: collected.id,
            }),
          ],
        };
        ClarificationQuestion.push(clafication);
        const clarficationredirection = {
          id: uuid(),
          label:  `$${collectedVar.name}$ = '1' : ${collected.name}`,
          condition: `$${collectedVar.name}$ = '1'`,
          cible: clafication.id,
          flowControlType : "CLARIFICATION",
        };
        const clarficationredirectionid = clarficationredirection.id;
        const flow = Redirection.stateToRemote({[clarficationredirectionid] : clarficationredirection});
        flowcontrolefinal.push(flow[0]);
      }
    }
  });
  return {
    flowcontrolefinal,
    ClarificationQuestion
  }
}

function getClarificationResponseTableQuestion(collectedVariablesStore, collectedVariables, codesListsStore, responseFormat, FlowControl, TargetMode, Name){
  let ClarificationQuestion= [];
  let collectedvariablequestion = [];
  let flowcontrolefinal = [];
  Object.values(collectedVariablesStore).forEach(collec => {
   if (collectedVariables != undefined){
    collectedVariables.forEach(variables =>{
      if(collec.id === variables ){
        collectedvariablequestion.push(collec);
      }
    });
   }
  });
  FlowControl.forEach(flowcon => {
    if(flowcon.flowControlType === undefined){
      flowcontrolefinal.push(flowcon);
    }
  });
  collectedvariablequestion.forEach(function(collected) {
    if(responseFormat.TABLE.PRIMARY.CODES_LIST) {
      const code = Object.values(codesListsStore[responseFormat.TABLE.PRIMARY.CODES_LIST.CodesList.id].codes).find(code => code.weight === collected.z);
      if (!collected.codeListReference && code) {
        const collectedVar =  collectedvariablequestion.find(collectedVarible=> collectedVarible.x == code.weight)
        let clafication = {
          id: uuid(),
          questionType: QUESTION_TYPE_ENUM.SIMPLE,
          Name: code.precisionid,
          Label: code.precisionlabel,
          TargetMode: TargetMode,
          Response: [
            Response.stateToRemote({
              mandatory : false,
              typeName: collected.type,
              maxLength: collected.TEXT.maxLength,
              pattern: '',
              collectedVariable: collected.id,
            }),
          ],
        };
        ClarificationQuestion.push(clafication);
        const clarficationredirection = {
          id: uuid(),
          label:  `$${collectedVar.name}$ = '${code.value}' : ${collected.name}`,
          condition: `$${collectedVar.name}$ = '${code.value}'`,
          cible: clafication.id,
          flowControlType : "CLARIFICATION",
        };
        const clarficationredirectionid = clarficationredirection.id;
        const flow = Redirection.stateToRemote({[clarficationredirectionid] : clarficationredirection});
        flowcontrolefinal.push(flow[0]);
      }
    }
  });
  return {
    flowcontrolefinal,
    ClarificationQuestion
  }
}

function storeToRemoteNested(
  state,
  store,
  collectedVariablesStore,
  codesListsStore,
  depth = 1
) {
  const {
    id,
    name: Name,
    label,
    type,
    children,
    responseFormat,
    declarations,
    controls,
    redirections,
    collectedVariables,
    TargetMode,
  } = state;
 
  let remote = {
    id,
    depth,
    Name,
    Label: [label.replace(/\n\n/gi, '&#xd;')],
    Declaration: Declaration.stateToRemote(declarations),
    Control: Control.stateToRemote(controls),
    // Trello #196 : ouput : GoTo --> FlowControl
    FlowControl: Redirection.stateToRemote(redirections),
    TargetMode,
  };

  if (type === QUESTION) {
    if(responseFormat.type === "SINGLE_CHOICE" && collectedVariablesStore !=undefined){
      const remoteclarification = getClarificationresponseSingleChoiseQuestion(collectedVariablesStore, collectedVariables, codesListsStore, responseFormat, remote.FlowControl, TargetMode, Name);
      remote.FlowControl = remoteclarification.flowcontrolefinal;
      remote.ClarificationQuestion = remoteclarification.ClarificationQuestion;
    } 

    if(responseFormat.type === "MULTIPLE_CHOICE" && collectedVariablesStore !=undefined){
      const remoteclarification = getClarificationResponseMultipleChoiceQuestion(collectedVariablesStore, collectedVariables, codesListsStore, responseFormat, remote.FlowControl, TargetMode, Name);
      remote.FlowControl = remoteclarification.flowcontrolefinal;
      remote.ClarificationQuestion = remoteclarification.ClarificationQuestion;
    } 
    if(responseFormat.type === "TABLE" && collectedVariablesStore !=undefined){
      const remoteclarification = getClarificationResponseTableQuestion(collectedVariablesStore, collectedVariables, codesListsStore, responseFormat, remote.FlowControl, TargetMode, Name);
      remote.FlowControl = remoteclarification.flowcontrolefinal;
      remote.ClarificationQuestion = remoteclarification.ClarificationQuestion;
    } 
  
    remote.type = QUESTION_TYPE_NAME;
    remote.questionType = responseFormat.type;
    remote = {
      ...remote,
      ...ResponseFormat.stateToRemote(
        responseFormat,
        collectedVariables,
        collectedVariablesStore,
      ),
    };
  } else {
    remote.type = SEQUENCE_TYPE_NAME;
    if (type === QUESTIONNAIRE) {
      remote.genericName = 'QUESTIONNAIRE';
    } else if (type === SEQUENCE) {
      remote.genericName = 'MODULE';
    } else {
      remote.genericName = 'SUBMODULE';
    }
    remote.Child = childrenToRemote(
      children,
      store,
      collectedVariablesStore,  
      codesListsStore,
      depth,
    );
  }
  return remote;
}
function childrenToRemote(
  children,
  store,
  collectedVariablesStore = {},
  codesListsStore,
  depth = 0,
) {
  return children.sort(sortByWeight(store)).map(key => {
    const newDepth = depth + 1;
    return storeToRemoteNested(
      store[key],
      store,
      collectedVariablesStore,
      codesListsStore,
      newDepth,
    ); // eslint-disable-line no-use-before-define
  });
}

export function remoteToStore(remote, questionnaireId, codesListsStore) {
  return {
    ...remoteToStoreNested(
      remote.Child,
      questionnaireId,
      remote.ComponentGroup,
      codesListsStore,
    ),
    [questionnaireId]: remoteToState(remote, []),
  };
}

export function storeToRemote(store, questionnaireId, collectedVariablesStore, codesListsStore) {
  return store[questionnaireId].children.sort(sortByWeight(store)).map(key => {
    return storeToRemoteNested(store[key], store, collectedVariablesStore, codesListsStore);
  });
}