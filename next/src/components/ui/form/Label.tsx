type LabelProps = React.ComponentProps<'label'> & {
  required?: boolean;
};

export default function Label({
  children,
  required = false,
  className = '',
  ...props
}: Readonly<LabelProps>) {
  return (
    <label
      className={`text-sm font-semibold mb-1 ml-1 ${className}`}
      {...props}
    >
      {children}
      {required ? '*' : ''}
    </label>
  );
}
