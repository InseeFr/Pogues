type Props = {
  error: string;
};

/**
 * Component that can be used in router to display an error instead of main
 * content. Wrap in page layout if needed.
 */
export default function ErrorComponent({ error = '' }: Readonly<Props>) {
  return <div className="text-error">{error}</div>;
}
