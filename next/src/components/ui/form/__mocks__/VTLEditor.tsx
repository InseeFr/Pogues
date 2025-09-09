import { Variable } from '@/models/variables';

import Input, { InputProps } from '../Input';

export default function VTLEditor({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  suggestionsVariables,
  ...props
}: Readonly<{ suggestionsVariables: Variable[] } & InputProps>) {
  return <Input className="col-start-2" {...props} />;
}
