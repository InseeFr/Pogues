import Option from '@/components/ui/Option';
import Select from '@/components/ui/Select';
import type { Stamp } from '@/models/stamps';

interface StampsSelectorProps {
  stamps?: Stamp[];
  selectedStamp?: string;
  onSelect: (stampId: string) => void;
}

/** Allow to select a stamp to fetch its questionnaires. */
export default function StampsSelector({
  stamps = [],
  selectedStamp,
  onSelect,
}: Readonly<StampsSelectorProps>) {
  return (
    <Select
      label={'Timbre'}
      value={selectedStamp}
      required
      onChange={(_, newValue) => onSelect(newValue as string)}
    >
      {stamps.map((stamp) => (
        <Option key={stamp.id} value={stamp.id}>
          {stamp.label}
        </Option>
      ))}
    </Select>
  );
}
