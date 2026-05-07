import { type Filter as FilterModel, FilterType } from '@/models/filters'

import Field from './form/Field'
import Input from './form/Input'
import Select from './form/Select'
import Switch from './form/Switch'
import ToggleGroup from './form/ToggleGroup'

interface Props<T> {
  filter: FilterModel<T>
  onActiveFilter: (
    filter: FilterModel<T>,
    value: string | boolean | string[],
  ) => void
}

/** Display a filter one can activate. To be used with Filters component. */
export default function Filter<T>({
  filter,
  onActiveFilter,
}: Readonly<Props<T>>) {
  switch (filter.type) {
    case FilterType.Select: {
      return (
        <div className="min-w-42">
          <Field label={filter.label}>
            <Select<string>
              options={filter.options}
              onChange={(e) => onActiveFilter(filter, e ?? '')}
            />
          </Field>
        </div>
      )
    }
    case FilterType.ToggleGroup: {
      return (
        <ToggleGroup
          onChange={(e) => onActiveFilter(filter, e)}
          options={filter.options}
        />
      )
    }
    case FilterType.Boolean: {
      return (
        <Field label={filter.label}>
          <Switch onCheckedChange={(e) => onActiveFilter(filter, e)} />
        </Field>
      )
    }
    case FilterType.Text: {
      return (
        <Field label={filter.label}>
          <Input
            onValueChange={(value) => onActiveFilter(filter, value)}
            placeholder={filter.placeholder}
          />
        </Field>
      )
    }
  }
}
