interface Props {
  children: React.ReactNode;
  className?: string;
}

/** Display the content in a card. */
export default function Card({
  children = null,
  className = '',
}: Readonly<Props>) {
  return (
    <div className={`${className} p-4 bg-default border shadow-sm`}>
      {children}
    </div>
  );
}
