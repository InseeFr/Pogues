interface ContentMainProps {
  children: React.ReactNode;
}

/** Main content wrapper. Use it if you want the same padding as everywhere else. */
export default function ContentMain({ children }: Readonly<ContentMainProps>) {
  return <div className="px-12 py-8 space-y-4">{children}</div>;
}
