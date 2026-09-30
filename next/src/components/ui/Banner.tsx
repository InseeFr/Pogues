import { ComponentType } from 'react'

import ErrorIcon from '@/components/ui/icons/ErrorIcon'
import InfoIcon from '@/components/ui/icons/InfoIcon'
import WarningIcon from '@/components/ui/icons/WarningIcon'

export interface BannerDetail {
  message: string
  dataIndex?: number
  attributeKey?: string
}

// eslint-disable-next-line react-refresh/only-export-components
export enum BannerStyle {
  Info,
  Warning,
  Error,
}

interface BannerStyleConfig {
  className: string
  iconClassName: string
  role: 'alert' | 'status'
  Icon: ComponentType<React.ComponentProps<'svg'>>
}

const BANNER_STYLE_CONFIGS: Record<BannerStyle, BannerStyleConfig> = {
  [BannerStyle.Info]: {
    className: 'bg-blue-100 border-blue-300 text-blue-800 border',
    iconClassName: 'text-blue-800',
    role: 'status',
    Icon: InfoIcon,
  },
  [BannerStyle.Warning]: {
    className:
      'bg-orange-100 border-amber-300 text-orange-800 border border-orange-300',
    iconClassName: 'text-orange-800',
    role: 'alert',
    Icon: WarningIcon,
  },
  [BannerStyle.Error]: {
    className: 'bg-red-100 border-red-300 text-red-800 border',
    iconClassName: 'text-red-800',
    role: 'alert',
    Icon: ErrorIcon,
  },
}

interface BannerProps {
  message: string
  type?: BannerStyle
  details?: BannerDetail[]
  ariaLabel?: string
}

/** Display a information banner (info, warning or error). */
export default function Banner({
  message,
  type = BannerStyle.Info,
  details,
  ariaLabel,
}: Readonly<BannerProps>) {
  const { className, iconClassName, role, Icon } = BANNER_STYLE_CONFIGS[type]

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={`${className} rounded px-4 py-3 flex items-start`}
    >
      <Icon className={`w-6 h-6 mr-3 mt-0.5 flex-shrink-0 ${iconClassName}`} />
      <div>
        <h4 className="text-base font-semibold">{message}</h4>
        {details && details.length > 0 && (
          <ul className="list-disc pl-5 mt-1">
            {details.map((detail, index) => (
              <li key={detail.dataIndex ?? index}>{detail.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
