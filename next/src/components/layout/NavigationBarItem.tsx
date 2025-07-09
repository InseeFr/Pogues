interface NavigationBarItemProps {
  active?: boolean;
  Icon: React.FC<React.ComponentProps<'svg'>>;
  iconClassName?: string;
  label: string;
  onIconClick?: () => void;
}

export default function NavigationBarItem({
  active = false,
  Icon,
  iconClassName = '',
  label,
  onIconClick,
}: Readonly<NavigationBarItemProps>) {
  return (
    <div
      aria-current={active}
      className="2xl:grid 2xl:grid-cols-[auto_1fr] items-center p-2 gap-x-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-blue-50 aria-current:text-blue-600 aria-current:fill-blue-600 aria-current:hover:bg-blue-200 aria-current:bg-blue-200 disabled:bg-disabled"
      title={label}
    >
      <Icon
        className={`m-auto size-8 2xl:size-6 ${iconClassName}`}
        onClick={onIconClick}
      />
      <span className="hidden 2xl:inline">{label}</span>
    </div>
  );
}
