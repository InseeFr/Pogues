type Props = {
  children: React.ReactNode;
};

/**
 * Display a sidebar on the left of the app.
 *
 * Should be used with SidebarItem and SidebarItemGroup.
 *
 * You can separate your navigation items in various sections: a separator will
 * be displayed between the various children.
 *
 * @example
 * ```
 * <Sidebar>
 *   <ul>
 *     <SidebarItem {...globalItemProps} />
 *   </ul>
 *   <ul>
 *     <SidebarItem {...versionItemProps} />
 *   </ul>
 * </Sidebar>
 * ```
 */
export default function Sidebar({ children }: Readonly<Props>) {
  return (
    <nav className="sticky top-0 w-18 2xl:w-52 max-h-[calc(100vh-var(--header-height))] divide-y *:py-3">
      {children}
    </nav>
  );
}
