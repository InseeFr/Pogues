interface GenericOptionProps {
  value: string;
  children: string;
  className?: string;
}

function GenericOption({
  value,
  children,
  className = '',
}: Readonly<GenericOptionProps>) {
  return (
    <div data-value={value} className={className}>
      {children}
    </div>
  );
}

export default GenericOption;
