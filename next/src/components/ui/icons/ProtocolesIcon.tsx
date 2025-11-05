/** Icon of a ruler, which should be used for everything protocoles related. */
export default function ProtocolesIcon({
  height = '24px',
  width = '24px',
  ...props
}: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      {...props}
    >
      <path d="M160-240q-33 0-56.5-23.5T80-320v-320q0-33 23.5-56.5T160-720h640q33 0 56.5 23.5T880-640v320q0 33-23.5 56.5T800-240H160Zm0-80h640v-320H680v160h-80v-160h-80v160h-80v-160h-80v160h-80v-160H160v320Zm120-160h80-80Zm160 0h80-80Zm160 0h80-80Zm-120 0Z" />
    </svg>
  );
}
