import * as Response from './response';
import { DATATYPE_NAME, DURATION_UNIT } from 'constants/pogues-constants';

export function remoteToState(remote) {
  const {
    responses: [
      {
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
        mandatory,
        id,
      },
    ],
  } = remote;

 const format = typeName==='DATE' && format1 ? format1.toLowerCase() : format1 ;

  const datatype = {};
  if (maxLength !== undefined) datatype.maxLength = maxLength;
  if (pattern !== undefined) datatype.pattern = pattern;
  if (minimum !== undefined) datatype.minimum = minimum;
  if (maximum !== undefined) datatype.maximum = maximum;
  if (decimals !== undefined) datatype.decimals = decimals;
  if (unit !== undefined) datatype.unit = unit;
  if (format !== undefined) datatype.format = format;

  if (datatype.minimum !== undefined && typeName==='DURATION' ) {
    let strminimum = datatype.minimum;
    let strmaximum = datatype.maximum;
    let matches_minimum = strminimum.match(/\d+/g);
    let matches_maximum = strmaximum.match(/\d+/g);
    if (format !== undefined && format === "PTnHnM" ) datatype.mihours = matches_minimum[0];
    if (format !== undefined && format === "PTnHnM" ) datatype.miminutes =  matches_minimum[1];
    if (format !== undefined && format === "PTnHnM" ) datatype.mahours = matches_maximum[0];
    if (format !== undefined && format === "PTnHnM" ) datatype.maminutes = matches_maximum[1];
    if (format !== undefined && format === "PnYnM" ) datatype.miyears = matches_minimum[0];
    if (format !== undefined && format === "PnYnM" ) datatype.mimonths = matches_minimum[1];
    if (format !== undefined && format === "PnYnM" ) datatype.mayears = matches_maximum[0];
    if (format !== undefined && format === "PnYnM" ) datatype.mamonths = matches_maximum[1];

    datatype.miyears == 0? datatype.miyears ='': datatype.miyears;
    datatype.mimonths == 0? datatype.mimonths ='': datatype.mimonths;
    datatype.mayears == 0? datatype.mayears ='': datatype.mayears;
    datatype.mamonths == 0? datatype.mamonths ='': datatype.mamonths;
    datatype.mihours == 0? datatype.mihours ='': datatype.mihours;
    datatype.miminutes == 0? datatype.miminutes ='': datatype.miminutes;
    datatype.mahours == 0? datatype.mahours ='': datatype.mahours;
    datatype.maminutes == 0? datatype.maminutes ='': datatype.maminutes;


  }

  return {
    id,
    type: typeName,
    mandatory,
    [typeName]: datatype,
  };
}
export function stateToRemote(state, collectedVariables) {
  const { mandatory, id } = state;
  let { type: typeName } = state;
  let dataType = state[typeName];
  
  if (dataType.format !== undefined && typeName === 'DATE' ) {

    dataType.format = dataType.format.toUpperCase();
    if(dataType.minimum ===  ''){
      delete dataType.minimum;
    }

    if(dataType.maximum ===  ''){
      delete dataType.maximum;
    }
  }


    
  if (typeName === 'DURATION' && dataType.format === 'PnYnM' ){
    dataType.miyears==''?dataType.miyears = 0: dataType.miyears;
    dataType.mimonths==''?dataType.mimonths = 0: dataType.mimonths;
    dataType.mayears==''?dataType.mayears = 0: dataType.mayears;
    dataType.mamonths==''?dataType.mamonths = 0: dataType.mamonths;
 
    dataType.minimum = "P"+dataType.miyears+"Y"+dataType.mimonths+"M";
    dataType.maximum = "P"+dataType.mayears+"Y"+dataType.mamonths+"M";

  } 

  if (typeName === 'DURATION' && dataType.format === 'PTnHnM' ){
    dataType.mihours==''?dataType.mihours = 0: dataType.mihours;
    dataType.miminutes==''?dataType.miminutes = 0: dataType.miminutes;
    dataType.mahours==''?dataType.mahours = 0: dataType.mahours;
    dataType.maminutes==''?dataType.maminutes = 0: dataType.maminutes;
    dataType.minimum = "PT"+dataType.mihours+"H"+dataType.miminutes+"M";
    dataType.maximum = "PT"+dataType.mahours+"H"+dataType.maminutes+"M";
  } 
  
  if(typeName === 'DURATION'){
    delete dataType.miyears;
    delete dataType.mimonths;
    delete dataType.mihours;
    delete dataType.miminutes;
    delete dataType.mayears;
    delete dataType.mamonths;
    delete dataType.mahours;
    delete dataType.maminutes;
  }



  return {
    Response: [
      Response.stateToRemote({
        ...dataType,
        id,
        typeName,
        mandatory,
        collectedVariable: collectedVariables[0],
      }),
    ],
  };

}
