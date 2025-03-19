export default function ArrowUpIcon({
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
      <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
    </svg>
  );
}
