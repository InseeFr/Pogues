import Input from '../Input';

interface VTLEditorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function VTLEditor({ error }: Readonly<VTLEditorProps>) {
  return <Input className="col-start-2" error={error} />;
}
