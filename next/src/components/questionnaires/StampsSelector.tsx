import Label from '@/components/ui/Label';
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
    <>
      <Label>Timbre</Label>
      <Select onChange={(v) => onSelect(v as string)} value={selectedStamp}>
        {stamps.map((stamp) => (
          <Option key={stamp.id} value={stamp.id}>
            {stamp.label}
          </Option>
        ))}
      </Select>
    </>
  );
}
