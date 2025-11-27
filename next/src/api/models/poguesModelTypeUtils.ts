/** @version 1.9.0 */
export type TypedValueType = {
  /** @defaultValue ValueTypeEnum.Number */
  type?: ValueTypeEnum;
};

/** @version 1.9.0 */
export enum ValueTypeEnum {
  Number = 'number',
  VTL = 'VTL',
  Text = 'TXT',
  VtlOrMarkdown = 'VTL|MD',
}
