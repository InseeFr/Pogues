import { useId, useState } from 'react';

import ExpandButton from '@/components/ui/ExpandButton';

interface OverviewItemProps {
  /** Content displayed in the card.  */
  content: React.ReactNode;
  /**
   * Content displayed when the card is expanded.
   * If nothing is provided, there won't be a button to expand the card.
   */
  details?: React.ReactNode;
  /** Whether or not the card is expanded by default. */
  defaultExpanded?: boolean;
  /** Whether or not the expand button is hidden. */
  disableExpandButton?: boolean;
}

/** Display a title and its content in a card, to be used in overview. */
export default function OverviewItem({
  content,
  details = null,
  defaultExpanded = false,
  disableExpandButton = false,
}: Readonly<OverviewItemProps>) {
  const expandDetailsId = useId();
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  return (
    <li
      className={`relative p-4 bg-default border first:border-t last:border-b shadow-sm grid grid-rows-[auto_1fr_auto] transition-all ${isExpanded ? 'not-first:mt-6 not-last:mb-6' : 'not-first:mt-[-1px]'}`}
    >
      <div className="grid grid-cols-[1fr_auto]">{content}</div>
      {details ? (
        <>
          <div
            hidden={!isExpanded}
            className={`grid overflow-hidden grid-rows-[1fr] transition-all`}
            id={expandDetailsId}
          >
            <div
              className={`overflow-hidden space-y-3 ${disableExpandButton ? '' : 'pb-6'}`}
            >
              {details}
            </div>
          </div>
          {!disableExpandButton ? (
            <div className="text-center absolute bottom-0 left-1/2">
              <ExpandButton
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                ariaControls={expandDetailsId}
              />
            </div>
          ) : null}
        </>
      ) : null}
    </li>
  );
}
