import * as React from 'react';

import { LinkComponent, createLink } from '@tanstack/react-router';

export enum ButtonStyle {
  Primary,
  Secondary,
}

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
  buttonStyle?: ButtonStyle;
}

const AnchorButtonComponent = React.forwardRef<
  HTMLAnchorElement,
  BasicLinkProps
>(({ buttonStyle = ButtonStyle.Secondary, children, ...props }, ref) => (
  <a
    ref={ref}
    {...props}
    className={`text-center border font-semibold transition rounded px-4 py-3 min-w-40 outline-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
      buttonStyle === ButtonStyle.Primary
        ? 'bg-primary text-negative hover:bg-primary-accent active:bg-primary-active border-none'
        : 'bg-white text-primary hover:bg-accent active:bg-active border-primary'
    }
                `}
  >
    {children}
  </a>
));

const CreatedLinkComponent = createLink(AnchorButtonComponent);

const ButtonLink: LinkComponent<typeof AnchorButtonComponent> = (props) => {
  return <CreatedLinkComponent {...props} />;
};

export default ButtonLink;
