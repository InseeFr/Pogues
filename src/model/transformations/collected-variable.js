import { uuid } from 'utils/utils';
import {
  VARIABLES_TYPES,
  DATATYPE_TYPE_FROM_NAME, DATATYPE_NAME
} from 'constants/pogues-constants';
import { element } from 'prop-types';
const { COLLECTED } = VARIABLES_TYPES;

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
        if(find.type === 'MULTIPLE_CHOICE') {       
          variable.z = parseInt(find.position) + 1;
        }
        else if(find.type === 'TABLE') {
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
export function storeToRemote(store) {
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