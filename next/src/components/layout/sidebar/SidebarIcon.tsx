type Props = {
  active?: boolean;
  Icon?: React.FC<React.ComponentProps<'svg'>>;
  iconClassName?: string;
  label: string;
  onIconClick?: () => void;
};

/** Display an icon with a label to be used in a `Sidebar`. */
export default function SidebarIcon({
  active = false,
  Icon,
  iconClassName = '',
  label,
  onIconClick,
}: Readonly<Props>) {
  return (
    <div
      aria-current={active}
      className="2xl:grid 2xl:grid-cols-[auto_1fr] items-center p-2 gap-x-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-blue-50 aria-current:text-blue-600 aria-current:fill-blue-600 aria-current:bg-blue-200 disabled:bg-disabled"
      title={label}
    >
      {Icon ? (
        <Icon
          className={`m-auto size-6 ${iconClassName}`}
          onClick={onIconClick}
        />
      ) : null}
      <span className="hidden 2xl:inline text-left">{label}</span>
    </div>
  );
}
