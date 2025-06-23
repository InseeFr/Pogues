import QuestionnaireNavigation from './QuestionnaireNavigation';

interface QuestionnaireLayoutProps {
  children: React.ReactNode;
}

/** Layout used for questionnaire page with a navbar with links. */
export default function QuestionnaireLayout({
  children,
}: Readonly<QuestionnaireLayoutProps>) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-full">
      <div className="bg-default border-r border-default">
        <QuestionnaireNavigation />
      </div>
      <div>{children}</div>
    </div>
  );
}
