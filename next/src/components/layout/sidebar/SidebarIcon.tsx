type Props = {
  active?: boolean
  Icon?: React.FC<React.ComponentProps<'svg'>>
  iconClassName?: string
  label: string
  onIconClick?: () => void
}

/** Display an icon with a label to be used in a `Sidebar`. */
export default function SidebarIcon({
  Icon,
  iconClassName = '',
  label,
  onIconClick,
}: Readonly<Props>) {
  return (
    <div
      className="2xl:grid 2xl:grid-cols-[auto_1fr] items-center p-2 gap-x-3 cursor-pointer hover:text-blue-600 hover:fill-blue-600 hover:bg-blue-50 group-aria-current:text-blue-600 group-aria-current:fill-blue-600 group-aria-current:bg-blue-200"
      title={label}
    >
      {Icon ? (
        <Icon
          className={`m-auto size-6 ${iconClassName}`}
          onClick={onIconClick}
        />
      ) : null}
      <span className="sr-only 2xl:not-sr-only text-left">{label}</span>
    </div>
  )
}
