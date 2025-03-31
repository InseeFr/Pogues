import { Code } from '@/models/codesLists';

interface CodeLineProps {
  code: Code;
  subCodeIteration?: number;
}

/**
 * Display a line with code information to be used in the codes list overview table.
 */
export default function CodeLine({
  code,
  subCodeIteration = 0,
}: Readonly<CodeLineProps>) {
  return (
    <>
      <tr className="bg-default odd:bg-main *:p-4">
        <td>
          <div style={{ marginLeft: `${subCodeIteration * 1.5}rem` }}>
            {code.value}
          </div>
        </td>
        <td>{code.label}</td>
      </tr>
      {code.codes?.map((code) => (
        <CodeLine
          code={code}
          key={code.value}
          subCodeIteration={subCodeIteration + 1}
        />
      ))}
    </>
  );
}
