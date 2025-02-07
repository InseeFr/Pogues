import * as React from 'react';

import { LinkComponent, createLink } from '@tanstack/react-router';

export enum ButtonType {
  Primary,
  Secondary,
}

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
  disabled: boolean;
  buttonType?: ButtonType;
}

const AnchorButtonComponent = React.forwardRef<
  HTMLAnchorElement,
  BasicLinkProps
>(({ buttonType = ButtonType.Secondary, children, ...props }, ref) => (
  <a
    ref={ref}
    {...props}
    className={`text-center border font-semibold transition rounded px-4 py-3 min-w-40 disabled:cursor-not-allowed outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
      buttonType === ButtonType.Primary
        ? 'bg-primary text-negative disabled:bg-primary-disabled hover:enabled:bg-primary-accent active:enabled:bg-primary-active border-none'
        : 'bg-white text-primary hover:enabled:bg-accent active:enabled:bg-active border-primary'
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
