import Breadcrumb from '@/components/ui/Breadcrumb';

import ReadonlyWarning from './ReadonlyWarning';

export type Props = {
  /** Action to display on the right. Should be a button. */
  action?: React.ReactNode;
  /**
   * Display a warning if the current content is readonly, which allow to
   * restore the backup save from the provided version id.
   */
  isReadonly?: boolean;
  questionnaireId?: string;
  title: string;
  /** Display a button to rollback to the specified version. */
  versionId?: string;
};

/**
 * Component used to display a header with a title and breadcrumb on top of the
 * content.
 *
 * It can display a contextual action that is often used on the page and should
 * be easily accessible (e.g. a "new" button).
 *
 * It can be set as readonly if we're in "history" mode, in which case it will
 * display a readonly warning and allow to restore the backup save from the
 * provided version id.
 */
export default function ContentHeader({
  action,
  isReadonly = false,
  questionnaireId,
  title,
  versionId,
}: Readonly<Props>) {
  return (
    <>
      <div className="grid grid-cols-[1fr_auto] px-12 py-6 bg-default border-b border-default items-end">
        <div>
          <Breadcrumb />
          <h1>{title}</h1>
        </div>
        <div>{action}</div>
      </div>
      {isReadonly ? (
        <ReadonlyWarning
          questionnaireId={questionnaireId}
          versionId={versionId}
        />
      ) : null}
    </>
  );
}
