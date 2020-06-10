import { uuid } from 'utils/utils';
import {
  VARIABLES_TYPES,
  DATATYPE_TYPE_FROM_NAME, 
  DATATYPE_NAME,
  COMPONENT_TYPE,
  QUESTION_TYPE_ENUM,
  DIMENSION_FORMATS
} from 'constants/pogues-constants';
const { COLLECTED } = VARIABLES_TYPES;
const { QUESTION, SEQUENCE, SUBSEQUENCE, LOOP } = COMPONENT_TYPE;
const { TABLE, MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;
const { LIST } = DIMENSION_FORMATS;

export function remoteToStore(
  remote = [],
  responsesByVariable,
  codesListsStore,
  variableclarification,
) {
  remote.forEach(variable => {
    if(variableclarification) {
      const find = variableclarification.find(element => element.responseclar.Response[0].CollectedVariableReference == variable.id)
      if(find) {
        if(find.type === MULTIPLE_CHOICE) {       
          variable.z = parseInt(find.position);
        }
        else if(find.type === TABLE) {
          const code = Object.values(codesListsStore[find.codelistid].codes).find(cod => cod.value === find.position)
          variable.z = code.weight;
          variable.mesureLevel = find.level
        }
        else {
          const code = Object.values(codesListsStore[find.codelistid].codes).find(cod => cod.value === find.position)
          variable.z = code.weight;
        }
      }
    }
  })
  return remote.reduce((acc, ev) => {
    ev.Datatype = ev.Datatype || {};
    const {
      Name: name,
      Label: label,
      CodeListReference,
      Datatype: {
        typeName,
        MaxLength: maxLength,
        Pattern: pattern,
        Minimum: minimum,
        Maximum: maximum,
        Decimals: decimals,
        Unit: unit,
        Format: format1,
      },
    } = ev;
    const z = ev.z;
    const mesureLevel = ev.mesureLevel;
    const id = ev.id || uuid();
    const format =
    typeName === DATATYPE_NAME.DATE && format1 ? format1.toLowerCase() : format1;
    const datatype = {};
    if (maxLength !== undefined) datatype.maxLength = maxLength;
    if (pattern !== undefined) datatype.pattern = pattern;
    if (minimum !== undefined) datatype.minimum = minimum;
    if (maximum !== undefined) datatype.maximum = maximum;
    if (decimals !== undefined) datatype.decimals = decimals;
    if (unit !== undefined) datatype.unit = unit;
    if (format !== undefined) datatype.format = format;
    if ( typeName === DATATYPE_NAME.DURATION) {
      if(datatype.minimum !== undefined){
        let strminimum = datatype.minimum;
        let matches_minimum = strminimum.match(/\d+/g);
        if (format !== undefined && format === 'PTnHnM') {
          datatype.mihours = matches_minimum[0] == 0 ? '' : matches_minimum[0];
          datatype.miminutes = matches_minimum[1] == 0 ? '' : matches_minimum[1];
        }
        if (format !== undefined && format === 'PnYnM') {
          datatype.miyears = matches_minimum[0] == 0 ? '' : matches_minimum[0];
          datatype.mimonths = matches_minimum[1] == 0 ? '' : matches_minimum[1];
        }
      }
      if(datatype.maximum !== undefined){
        let strmaximum = datatype.maximum;
        let matches_maximum = strmaximum.match(/\d+/g);
        if (format !== undefined && format === 'PTnHnM') {
          datatype.mahours = matches_maximum[0] == 0 ? '' : matches_maximum[0];
          datatype.maminutes = matches_maximum[1] == 0 ? '' : matches_maximum[1];
        }
        if (format !== undefined && format === 'PnYnM') {
          datatype.mayears = matches_maximum[0] == 0 ? '' : matches_maximum[0];
          datatype.mamonths = matches_maximum[1] == 0 ? '' : matches_maximum[1];
        }
      }
    }
    return {
      ...acc,
      [id]: {
        id,
        name,
        label,
        type: typeName,
        codeListReference: CodeListReference,
        codeListReferenceLabel: CodeListReference
          ? codesListsStore[CodeListReference].label
          : '',
        z,
        mesureLevel,
        [typeName]: datatype,
        ...responsesByVariable[id],
      },
    };
  }, {});
}
export function remoteToComponentState(remote = []) {
  return remote
    .filter(r => r.CollectedVariableReference)
    .map(r => r.CollectedVariableReference);
} 

function getQuestionFromSequence (componentsStore, id) {
  let sequenceQuestions = [];
  componentsStore[id].children.forEach(child=> {
    if(componentsStore[child]) {
      if(componentsStore[child].type === QUESTION) {
        sequenceQuestions.push(componentsStore[child]);
      }
      else {
       componentsStore[child].children.forEach(chil => {
        sequenceQuestions.push(componentsStore[chil]);
       })
      }
    }
 })
 return sequenceQuestions;
}

function getQuestionFromSubSequence (componentsStore, id) {
  let SubSequenceQuestions = [];
  if(componentsStore[id].children) {
    componentsStore[id].children.forEach(child=> {
      if(componentsStore[child] && componentsStore[child].type === QUESTION) {
         SubSequenceQuestions.push(componentsStore[child]);
        } 
      })
  }

 return SubSequenceQuestions;
}

function findQuestionInLoop(componentsStore) {
  let LoopsQuestions = {};
  Object.values(componentsStore).filter(element => element.type === LOOP).forEach(component => {
    let LoopQuestions = [];
    if(componentsStore[component.initialMember]) {
      if(componentsStore[component.initialMember].type === SEQUENCE) {
        if(componentsStore[component.initialMember].weight != componentsStore[component.finalMember].weight) {
          for ( var i = componentsStore[component.initialMember].weight; i <= componentsStore[component.finalMember].weight; i++) {
            const sequence = Object.values(componentsStore).find(element => element.type === SEQUENCE && element.weight === i)
            if(sequence) {
              LoopQuestions = LoopQuestions.concat(getQuestionFromSequence(componentsStore, sequence.id));
            }
          }
        }
        else {
          LoopQuestions = LoopQuestions.concat(getQuestionFromSequence(componentsStore, componentsStore[component.initialMember].id));
        }
      }
      else {
        if(componentsStore[component.initialMember].weight != componentsStore[component.finalMember].weight) {
          for ( var i = componentsStore[component.initialMember].weight; i <= componentsStore[component.finalMember].weight; i++) {
            const subsequence = Object.values(componentsStore).find(element => element.type === SUBSEQUENCE && element.weight === i && element.parent === componentsStore[component.initialMember].parent)
            if(subsequence) {
              LoopQuestions = LoopQuestions.concat(getQuestionFromSubSequence(componentsStore, subsequence.id));
            }
          }
        }
        else {
            LoopQuestions = LoopQuestions.concat(getQuestionFromSubSequence(componentsStore, componentsStore[component.initialMember].id));
        }
      }
    }

    LoopsQuestions[component.id] = LoopQuestions;
  })
  return LoopsQuestions;
}
function getCollectedScope(questionsLoop, id, componentsStore) {
  let isfound = {};
  Object.keys(questionsLoop).map(key => {
    questionsLoop[key].forEach(element => {
      if(element.collectedVariables && element.collectedVariables.find(collected=> collected === id)) {
        isfound = {
         loop : componentsStore[key],
         component : element
        } 
      }
    });
  })
  return isfound;
}
export function storeToRemote(store, componentsStore) {
  return Object.keys(store).map(key => {
    const {
      id,
      z,
      name: Name,
      label: Label,
      type: typeName,
      codeListReference,
      [typeName]: {
        maxLength: MaxLength,
        pattern: Pattern,
        minimum: Minimum,
        maximum: Maximum,
        decimals: Decimals,
        format: Format,
        unit: Unit,
        miyears: Miyears,
        mimonths: Mimonths,
        mayears: Mayears,
        mamonths: Mamonths,
        mihours: Mihours,
        miminutes: Miminutes,
        mahours: Mahours,
        maminutes: Maminutes,
      },
    } = store[key];
    
    const model = {
      id,
      Name,
      Label,
      type: COLLECTED,
      Datatype: {
        typeName,
        type: DATATYPE_TYPE_FROM_NAME[typeName],
      },
    };
    
    const questionsInLoop =  findQuestionInLoop(componentsStore);
    const collectedScop = getCollectedScope(questionsInLoop, id, componentsStore);
    if(collectedScop.component) {
      if(collectedScop.component.type === QUESTION && 
         collectedScop.loop && collectedScop.loop.basedOn
        ) 
        {
          model.Scope = collectedScop.loop.basedOn
        }
      else {
        model.Scope = collectedScop.loop.id
      }
    }
    
    if(codeListReference !== "") {
      model.CodeListReference = codeListReference;
    }

    if (MaxLength !== undefined) model.Datatype.MaxLength = MaxLength;

    if (Pattern !== undefined) model.Datatype.Pattern = Pattern;

    if (typeName === DATATYPE_NAME.DURATION && Format !== undefined) {
  
      if (Format === 'PnYnM' ) {
        if(Miyears || Mimonths){
          model.Datatype.Minimum = `P${Miyears || 0}Y${Mimonths || 0}M`;
        }
         if(Mayears || Mamonths){
          model.Datatype.Maximum = `P${Mayears || 0}Y${Mamonths || 0}M`;
        }
      }
      if (Format === 'PTnHnM') {
        if(Mihours || Miminutes){
          model.Datatype.Minimum = `PT${Mihours || 0}H${Miminutes || 0}M`;
        }
         if(Mahours || Maminutes){
          model.Datatype.Maximum = `PT${Mahours || 0}H${Maminutes || 0}M`;
        }
      }
     }
     else if (typeName === DATATYPE_NAME.DATE){
        if (Minimum !== '') {
          model.Datatype.Minimum = Minimum;
        }
        if (Maximum !== '') {
          model.Datatype.Maximum = Maximum;
        }
     }
    else {
      if (Minimum !== undefined) model.Datatype.Minimum = Minimum;
      if (Maximum !== undefined) model.Datatype.Maximum = Maximum;
    }
    if (Decimals !== undefined) model.Datatype.Decimals = Decimals;
    if (Unit !== undefined) model.Datatype.Unit = Unit;
    if (Format !== undefined ) { 
      if (typeName === DATATYPE_NAME.DATE){
        model.Datatype.Format = Format.toUpperCase();
      }
      else{
        model.Datatype.Format = Format;
      }
    }

    return model;
  });
}
