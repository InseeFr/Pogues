/**
 * Icon of plus symbol which should be used when one wants to increase a value.
 */
export function PlusIcon({
  height = '10',
  width = '10',
  ...props
}: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}
