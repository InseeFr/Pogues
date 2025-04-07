// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonIconStyle {
  Delete,
}

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.FC<React.ComponentProps<'svg'>>;
  title?: string;
  buttonStyle?: ButtonIconStyle;
  onClick?: () => void;
  iconProps?: React.SVGProps<SVGSVGElement>;
}

/** Display a clickable icon. */
export default function ButtonIcon({
  className,
  Icon,
  title = '',
  buttonStyle,
  onClick = () => {},
  ...props
}: Readonly<ButtonIconProps>) {
  return (
    <button
      title={title}
      type="button"
      className={`${className} enabled:cursor-pointer enabled:hover:bg-slate-200 w-fit p-0.5 rounded
        ${
          buttonStyle === ButtonIconStyle.Delete
            ? 'fill-red-600 hover:fill-red'
            : 'fill-slate-400 hover:fill-slate-900 disabled:fill-slate-200'
        }
      `}
      onClick={onClick}
      {...props}
    >
      <Icon />
    </button>
  );
}
