type Props = {
  value: string;
};

export default function InlineCode({ value }: Readonly<Props>) {
  return (
    <div className="p-2">
      <code className="inline-block whitespace-pre line px-2 py-1 text-primary bg-gray-50 border w-full">
        {value}
      </code>
    </div>
  );
}
