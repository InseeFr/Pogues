interface Props {
  onChange: (value: string) => void;
  value: string;
  options?: { id: string; label: string }[];
}

export default function Dropdown({
  onChange,
  value,
  options = [],
}: Readonly<Props>) {
  return (
    <div className="widget-dropdown">
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        id="STAMPS"
        className="widget-dropdown__select"
      >
        <option value="" />
        {options.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
