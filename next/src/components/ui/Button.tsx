import SpinnerIcon from './icons/SpinnerIcon';

export enum ButtonStyle {
  Primary,
  Secondary,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonStyle?: ButtonStyle;
  onClick?: () => void;
  isLoading?: boolean;
}

export default function Button({
  children,
  buttonStyle = ButtonStyle.Secondary,
  onClick = () => {},
  disabled = false,
  isLoading = false,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      className={`border cursor-pointer font-semibold transition rounded px-4 py-3 min-w-40 disabled:cursor-not-allowed outline-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        ${
          buttonStyle === ButtonStyle.Primary
            ? 'bg-primary text-negative disabled:bg-primary-disabled hover:enabled:bg-primary-accent active:enabled:bg-primary-active'
            : 'bg-white text-primary disabled:bg-disabled disabled:text-disabled hover:enabled:bg-accent active:enabled:bg-active disabled:border-default border-primary'
        }`}
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
