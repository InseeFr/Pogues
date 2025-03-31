// To be completed once we have more filters
export enum FilterType {
  Search = 'search',
  Stamp = 'stamp',
}

export type Filter = {
  type: FilterType;
  filterContent: string;
  clear?: () => void;
};
