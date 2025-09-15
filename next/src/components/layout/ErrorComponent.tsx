type Props = {
  ContentLayout?: ({
    children,
  }: {
    children: React.ReactNode;
  }) => React.ReactNode;
  error: Error;
};

/**
 * Component that can be used in router to display an error instead of main
 * content while keeping the page content layout.
 */
export default function ErrorComponent({
  ContentLayout = ({ children }) => children,
  error,
}: Readonly<Props>) {
  return (
    <ContentLayout>
      <div className="text-error">{error.message}</div>
    </ContentLayout>
  );
}
