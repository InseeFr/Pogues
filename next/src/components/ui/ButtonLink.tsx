import * as React from 'react';

import { LinkComponent, createLink } from '@tanstack/react-router';

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
  disabled: boolean;
}

const AnchorButtonComponent = React.forwardRef<
  HTMLAnchorElement,
  BasicLinkProps
>(({ children, ...props }, ref) => (
  <a
    ref={ref}
    {...props}
    className={
      'text-center border font-semibold transition rounded px-4 py-3 min-w-40 disabled:cursor-not-allowed outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary bg-white text-primary hover:bg-accent border-primary'
    }
  >
    {children}
  </a>
));

const CreatedLinkComponent = createLink(AnchorButtonComponent);

const ButtonLink: LinkComponent<typeof AnchorButtonComponent> = (props) => {
  return <CreatedLinkComponent {...props} />;
};

export default ButtonLink;
