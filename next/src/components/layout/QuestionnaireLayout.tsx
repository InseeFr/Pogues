import QuestionnaireNavigation from './QuestionnaireNavigation';

interface QuestionnaireLayoutProps {
  children: React.ReactNode;
}

export default function QuestionnaireLayout({
  children,
}: Readonly<QuestionnaireLayoutProps>) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-full">
      <QuestionnaireNavigation />
      <div>{children}</div>
    </div>
  );
}
