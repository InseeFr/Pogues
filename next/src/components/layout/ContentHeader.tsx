import Breadcrumb from '@/components/ui/Breadcrumb';

import ReadonlyWarning from './ReadonlyWarning';

interface ContentHeaderProps {
  /** Action to display on the right. Should be a button. */
  action?: React.ReactNode;
  /** Display a warning if the current content is readonly. */
  isReadonly?: boolean;
  questionnaireId?: string;
  title: string;
  /** Display a button to rollback to the specified version. */
  versionId?: string;
}

/** Header to use on top of the content. Display breadcrumb and custom title. */
export default function ContentHeader({
  action,
  isReadonly = false,
  questionnaireId,
  title,
  versionId,
}: Readonly<ContentHeaderProps>) {
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
