import { ValueTypeEnum } from './poguesModelTypeUtils'

/** @version 1.11.0 */
export type Articulation = {
  items?: Item[]
}

/** @version 1.11.0 */
type Item = {
  label: string
  /** @defaultValue "number" */
  type?: ValueTypeEnum[]
  value: string
}
