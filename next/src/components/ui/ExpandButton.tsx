import { useTranslation } from 'react-i18next';

import ArrowDownIcon from './icons/ArrowDownIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';

interface ExpandButtonProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  ariaControls: string;
}

export default function ExpandButton({
  isExpanded,
  setIsExpanded,
  ariaControls,
}: Readonly<ExpandButtonProps>) {
  const { t } = useTranslation();
  return (
    <button
      className="cursor-pointer mt-[0.5rem]"
      onClick={() => setIsExpanded((v) => !v)}
      aria-expanded={isExpanded}
      aria-controls={ariaControls}
      aria-label={isExpanded ? t('common.collapse') : t('common.expand')}
    >
      {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </button>
  );
}
