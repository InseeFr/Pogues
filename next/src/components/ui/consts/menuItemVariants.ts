/**
 * Variants one can use to apply a specific style to menu items based on what it
 * does.
 */
export enum MenuItemType {
  /** Delete action which should be displayed in red. */
  Delete,
  /**
   * Redirect to a new form which ask for additional information which should
   * end with an ellipsis.
   */
  Form,
}
