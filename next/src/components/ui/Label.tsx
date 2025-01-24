type LabelProps = React.ComponentProps<'label'> & {
  required?: boolean;
};

export default function Label({
  children,
  required = false,
}: Readonly<LabelProps>) {
  return (
    <label className="text-sm mb-1 ml-1">
      {children}
      {required ? ' *' : ''}
    </label>
  );
}
