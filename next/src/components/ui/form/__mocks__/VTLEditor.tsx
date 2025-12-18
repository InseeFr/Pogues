import { Variable } from '@/models/variables';

import FormInput, { Props } from '../FormInput';

export default function VTLEditor({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  suggestionsVariables,
  ...props
}: Readonly<{ suggestionsVariables: Variable[] } & Props>) {
  return <FormInput className="col-start-2" {...props} />;
}
