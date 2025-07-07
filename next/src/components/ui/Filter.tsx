import { type Filter as FilterModel, FilterType } from '@/models/filters';

import Input from './form/Input';
import Option from './form/Option';
import Select from './form/Select';
import Switch from './form/Switch';
import ToggleGroup from './form/ToggleGroup';

interface Props<T> {
  filter: FilterModel<T>;
  onActiveFilter: (filter: FilterModel<T>, value: string | boolean) => void;
}

/** Display a filter one can activate. To be used with Filters component. */
export default function Filter<T>({
  filter,
  onActiveFilter,
}: Readonly<Props<T>>) {
  switch (filter.type) {
    case FilterType.Select: {
      return (
        <Select onChange={(e) => onActiveFilter(filter, e as string)}>
          {filter.options.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      );
    }
    case FilterType.ToggleGroup: {
      return (
        <ToggleGroup
          onChange={(e) => onActiveFilter(filter, e[0])}
          options={filter.options}
        />
      );
    }
    case FilterType.Boolean: {
      return (
        <Switch
          label={filter.label}
          onChange={(e) => onActiveFilter(filter, e)}
        />
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
