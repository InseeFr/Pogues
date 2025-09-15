import ContentHeader, { Props as ContentHeaderProps } from './ContentHeader';
import ContentMain from './ContentMain';

type Props = {
  children: React.ReactNode;
} & ContentHeaderProps;

/** Display both the content header and content main. */
export default function ContentWrapper({
  children,
  ...props
}: Readonly<Props>) {
  return (
    <>
      <ContentHeader {...props} />
      <ContentMain>{children}</ContentMain>
    </>
  );
}
