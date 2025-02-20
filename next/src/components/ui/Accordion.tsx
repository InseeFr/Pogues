import * as React from 'react';

import { Accordion as UIAccordion } from '@base-ui-components/react/accordion';

interface AccordionProps {
  children: React.ReactNode;
}

export default function Accordion({ children }: Readonly<AccordionProps>) {
  return (
    <UIAccordion.Root className="flex max-w-[calc(100vw-8rem)] flex-col justify-center text-default">
      {children}
    </UIAccordion.Root>
  );
}

interface AccordionItemProps {
  title?: string;
  children?: React.ReactNode;
}

export function AccordionItem({
  title = '',
  children = null,
}: Readonly<AccordionItemProps>) {
  return (
    <UIAccordion.Item className="[&:not(:last-child)]:border-b border-default">
      <UIAccordion.Header>
        <UIAccordion.Trigger className="group flex w-full cursor-pointer items-baseline justify-between gap-4 py-2 text-left font-medium focus-visible:outline focus-visible:outline-blue-800">
          <h3>{title}</h3>
          <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-panel-open:scale-110 group-data-panel-open:rotate-45" />
        </UIAccordion.Trigger>
      </UIAccordion.Header>
      <UIAccordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-base text-gray-600 transition-[height] ease-out data-ending-style:h-0 data-starting-style:h-0">
        <div className="pb-3">{children}</div>
      </UIAccordion.Panel>
    </UIAccordion.Item>
  );
}

function PlusIcon(props: Readonly<React.ComponentProps<'svg'>>) {
  return (
    <svg viewBox="0 0 12 12" fill="currentcolor" {...props}>
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}
