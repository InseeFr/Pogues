import { DIMENSION_TYPE, MAIN_DIMENSION_FORMATS } from 'constants/pogues-constants';
import TransformationEntity from './transformation-entity';

const { PRIMARY } = DIMENSION_TYPE;
const { LIST, CODES_LIST } = MAIN_DIMENSION_FORMATS;

export const defaultDimensionState = {
  type: undefined,
  mainDimensionFormat: undefined,
  label: undefined,
  totalLabel: undefined,
  codesList: undefined,
  numLinesMin: undefined,
  numLinesMax: undefined,
};

class Dimension extends TransformationEntity {
  constructor() {
    super(defaultDimensionState);
    return this;
  }
  static parseDynamic(dynamic) {
    if (dynamic === '-') return [0, 0];
    return dynamic.split('-').map(v => parseInt(v, 10));
  }
  initFromModel(data) {
    const { dimensionType: type, codeListReference: codesList, dynamic, label, totalLabel } = data;
    const dimensionData = {
      type,
      codesList,
      label,
      totalLabel,
    };

    if (type === PRIMARY) {
      if (dynamic === 0) {
        dimensionData.mainDimensionFormat = CODES_LIST;
      } else {
        dimensionData.mainDimensionFormat = LIST;
        const [numLinesMin, numLinesMax] = Dimension.parseDynamic(dynamic);
        dimensionData.numLinesMin = numLinesMin;
        dimensionData.numLinesMax = numLinesMax;
      }
    }
    this.data = {
      ...this.data,
      ...dimensionData,
    };

    return this;
  }
  transformToModel() {
    const model = {};
    const data = this.data;

    if (data.type === PRIMARY && data.mainDimensionFormat === LIST) {
      model.dynamic = `${data.numLinesMin}-${data.numLinesMax}`;
    } else {
      model.dynamic = 0;
    }

    if (data.type !== undefined) model.dimensionType = data.type;
    if (data.label !== undefined) model.label = data.label;
    if (data.totalLabel !== undefined) model.totalLabel = data.totalLabel;
    if (data.codesList !== undefined) model.codeListReference = data.codesList;

    return model;
  }
}

export default Dimension;
