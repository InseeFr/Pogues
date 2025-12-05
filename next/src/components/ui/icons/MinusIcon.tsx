/**
 * Icon of minus symbol which should be used when one wants to decrease a value.
 */
export function MinusIcon({
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
      <path d="M0 5H10" />
    </svg>
  );
}
