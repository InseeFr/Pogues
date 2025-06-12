const Dropdown = ({ onChange, value, options }) => (
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

export default Dropdown;
