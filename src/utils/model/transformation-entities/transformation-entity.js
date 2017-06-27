class TransformationEntity {
  constructor(defaultState) {
    this.data = { ...defaultState };
    return this;
  }
  initFromState(data) {
    this.data = {
      ...this.data,
      ...data,
    };
    return this;
  }
  getStateData() {
    return { ...this.data };
  }
}

export default TransformationEntity;
