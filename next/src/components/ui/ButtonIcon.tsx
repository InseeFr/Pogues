// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonIconType {
  Delete,
}

interface ButtonIconProps {
  Icon: React.FC<React.ComponentProps<'svg'>>;
  title?: string;
  type?: ButtonIconType;
  onClick?: () => void;
}

/** Display a clickable icon. */
export default function ButtonIcon({
  Icon,
  title = '',
  type,
  onClick = () => {},
}: Readonly<ButtonIconProps>) {
  return (
    <button
      title={title}
      className={`fill-gray-600 cursor-pointer hover:bg-slate-200 w-fit p-0.5 rounded
        ${type === ButtonIconType.Delete ? 'hover:fill-red' : ''}
      `}
      onClick={onClick}
    >
      <Icon width="12.5px" height="12.5px" />
    </button>
  );
}
