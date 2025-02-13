import Breadcrumb from '@/components/ui/Breadcrumb';

interface ContentHeaderProps {
  /** Action to display on the right. Should be a button. */
  action?: React.ReactNode;
  title: string;
}

/** Header to use on top of the content. Display breadcrumb and custom title. */
export default function ContentHeader({
  action,
  title,
}: Readonly<ContentHeaderProps>) {
  return (
    <div className="grid grid-cols-[1fr_auto] px-12 py-6 bg-default border-b border-default items-end">
      <div>
        <Breadcrumb />
        <h1>{title}</h1>
      </div>
      <div>{action}</div>
    </div>
  );
}
