import SpinnerIcon from './icons/SpinnerIcon';

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonStyle {
  Primary,
  Secondary,
}

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonSize {
  sm,
  md,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize?: ButtonSize;
  buttonStyle?: ButtonStyle;
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

export default function Button({
  buttonSize = ButtonSize.md,
  buttonStyle = ButtonStyle.Secondary,
  className = '',
  children,
  disabled = false,
  isLoading = false,
  onClick = () => {},
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      className={`${className} border cursor-pointer font-semibold transition rounded disabled:cursor-not-allowed outline-hidden focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary text-nowrap
        ${
          buttonStyle === ButtonStyle.Primary
            ? 'bg-primary text-negative disabled:bg-primary-disabled hover:enabled:bg-primary-accent active:enabled:bg-primary-active'
            : 'bg-white text-primary fill-action-primary disabled:bg-disabled disabled:text-disabled hover:enabled:bg-accent active:enabled:bg-active disabled:border-default border-primary'
        } ${buttonSize === ButtonSize.md ? 'px-4 py-3 min-w-40' : 'px-2 py-1'}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex">
          <div
            className={`mr-3 animate-spin
              ${
                buttonStyle === ButtonStyle.Primary
                  ? 'fill-negative'
                  : 'fill-primary'
              }`}
          >
            <SpinnerIcon />
          </div>
          <div>{children}</div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
