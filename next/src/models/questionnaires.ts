export type Questionnaire = {
  id: string;
  title: string;
  targetModes: TargetModes[];
  lastUpdatedDate?: Date;
};

export enum TargetModes {
  CAWI,
  CAPI,
  PAPI,
  CATI,
}
