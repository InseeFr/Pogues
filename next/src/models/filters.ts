/**
 * Filters to provide to the Filters component. It will display the
 * corresponding input from the provided parameters.
 */
export type Filter<T> = BaseFilter &
  (BooleanFilter<T> | TextFilter<T> | ToggleGroupFilter<T> | SelectFilter<T>);

type BaseFilter = {
  label: string;
  type: FilterType;
};

type BooleanFilter<T> = {
  type: FilterType.Boolean;
  /** If the filter is activated, this filter will be triggered. */
  onFilter: (v: T) => boolean;
};

type SelectFilter<T> = {
  defaultValue?: string;
  placeholder?: string;
  type: FilterType.Select;
  options: { label: string; value: string }[];
  /** If the filter is activated, this filter will be triggered with the provided option. */
  onFilter: (v: T, filter?: string) => boolean;
};

type ToggleGroupFilter<T> = {
  type: FilterType.ToggleGroup;
  options: { label: string; value: string }[];
  /** If the filter is activated, this filter will be triggered with the provided options. */
  onFilter: (v: T, filter?: string[]) => boolean;
};

type TextFilter<T> = {
  placeholder?: string;
  type: FilterType.Text;
  /** If the filter is activated, this filter will be triggered with the provided input. */
  onFilter: (v: T, filter?: string) => boolean;
};

export enum FilterType {
  /** Display a chip one can toggle on / off. */
  Boolean,
  /**
   * Display a list of options to select from (when they are exclusive and/or
   * there are 4+ of them).
   */
  Select,
  /** Display a text input. */
  Text,
  /**
   * Display a toggle group (when they can be combined and/or there 3- of them).
   */
  ToggleGroup,
}

/** Filters to take into account, provided by the Filters component. */
export type ActiveFilter<T> = Filter<T> & { value?: string | string[] };
