type Props = {
  ContentLayout?: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }) => React.ReactNode;
  error: string;
};

/**
 * Component that can be used in router to display an error instead of main
 * content while keeping the page content layout.
 */
export default function ErrorComponent({
  ContentLayout = ({ children }) => children,
  error = '',
}: Readonly<Props>) {
  return (
    <ContentLayout>
      <div className="text-error">{error}</div>
    </ContentLayout>
  );
}
