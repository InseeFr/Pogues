// To be completed once we have more filters
export enum FilterEnum {
  Search = 'search',
  Stamp = 'stamp',
}

export type Filter = {
  filterType: FilterEnum;
  filterContent: string;
  clearFilterFunction?: () => void;
};
