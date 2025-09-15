type Props = {
  children: React.ReactNode;
};

/**
 * Component used to display content.
 *
 * Use it if you want the same padding as everywhere else.
 */
export default function ContentMain({ children }: Readonly<Props>) {
  return <div className="px-12 py-8 space-y-4">{children}</div>;
}
