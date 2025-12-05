import { type Filter as FilterModel, FilterType } from '@/models/filters';

import Input from './form/FormInput';
import Label from './form/Label';
import Select from './form/Select';
import Switch from './form/Switch';
import ToggleGroup from './form/ToggleGroup';

interface Props<T> {
  filter: FilterModel<T>;
  onActiveFilter: (
    filter: FilterModel<T>,
    value: string | boolean | string[],
  ) => void;
}

/** Display a filter one can activate. To be used with Filters component. */
export default function Filter<T>({
  filter,
  onActiveFilter,
}: Readonly<Props<T>>) {
  switch (filter.type) {
    case FilterType.Select: {
      return (
        <div className="grid grid-row grid-[auto_1fr] min-w-42">
          <Label>{filter.label}</Label>
          <Select<string>
            options={filter.options}
            onChange={(e) => onActiveFilter(filter, e)}
          />
        </div>
      );
    }
    case FilterType.ToggleGroup: {
      return (
        <ToggleGroup
          onChange={(e) => onActiveFilter(filter, e)}
          options={filter.options}
        />
      );
    }
    case FilterType.Boolean: {
      return (
        <>
          <Label>{filter.label}</Label>
          <Switch onCheckedChange={(e) => onActiveFilter(filter, e)} />
        </>
      );
    }
    case FilterType.Text: {
      return (
        <Input
          label={filter.label}
          onChange={(e) => onActiveFilter(filter, e.target.value)}
          placeholder={filter.placeholder}
        />
      );
    }
  }
}
