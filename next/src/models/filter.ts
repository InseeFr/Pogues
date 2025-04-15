// To be completed once we have more filters
export enum FilterEnum {
  Search = 'search',
  Stamp = 'stamp',
  QuestionUsed = 'questionUsed',
}

export type Filter = {
  filterType: FilterEnum;
  filterContent: string | boolean;
  clearFilterFunction?: () => void;
};
