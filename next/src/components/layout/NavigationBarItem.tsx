interface NavigationBarItemProps {
  icon: React.JSX.Element | null;
  label: string;
  active?: boolean;
}

export default function NavigationBarItem({
  icon,
  label,
  active = false,
}: Readonly<NavigationBarItemProps>) {
  return (
    <div
      aria-current={active}
      className="grid grid-cols-[auto_1fr] items-center p-2 gap-x-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-blue-50 aria-current:text-blue-600 aria-current:fill-blue-600 aria-current:hover:bg-blue-200 aria-current:bg-blue-200 disabled:bg-disabled"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
