import { Switch as BaseUISwitch } from '@base-ui-components/react/switch';

export type Props = {
  /**
   * Whether the switch is currently active.
   *
   * To render an uncontrolled switch, use the `defaultChecked` prop instead.
   */
  checked?: BaseUISwitch.Root.Props['checked'];
  /** A ref to access the hidden <input> element. */
  inputRef?: BaseUISwitch.Root.Props['inputRef'];
  /** Event handler called when the switch is activated or deactivated. */
  onCheckedChange?: BaseUISwitch.Root.Props['onCheckedChange'];
  onBlur?: BaseUISwitch.Root.Props['onBlur'];
};

/** A control that indicates whether a setting is on or off. */
export default function Switch({ ...props }: Readonly<Props>) {
  return (
    <BaseUISwitch.Root
      className="
        relative flex h-6 w-10 rounded-full
        bg-gradient-to-r from-primary from-35% to-gray-200 to-65%
        bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat
        p-px
        shadow-[inset_0_1.5px_2px] shadow-gray-200
        outline-1 -outline-offset-1 outline-gray-200
        transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)]
        before:absolute before:rounded-full before:outline-offset-2 before:outline-primary
        focus-visible:before:inset-0 focus-visible:before:outline-2
        active:bg-gray-100
        data-[checked]:bg-[0%_0%] data-[checked]:active:bg-gray-500
        dark:from-gray-500 dark:shadow-black/75 dark:outline-white/15 dark:data-[checked]:shadow-none
      "
      {...props}
    >
      <BaseUISwitch.Thumb
        className="
          aspect-square h-full rounded-full
          bg-white
          shadow-[0_0_1px_1px,0_1px_1px,1px_2px_4px_-1px] shadow-gray-100
          transition-transform duration-150
          data-[checked]:translate-x-4 dark:shadow-black/25
        "
      />
    </BaseUISwitch.Root>
  );
}
