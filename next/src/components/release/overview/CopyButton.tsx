import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import CopyIcon from '@/components/ui/icons/CopyIcon'

export function CopyButton({ text }: Readonly<{ text: string }>) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      //idl what to put here
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-action-primary fill-action-primary hover:underline cursor-pointer"
      title={
        copied ? t('release.copy.copiedTooltip') : t('release.copy.tooltip')
      }
    >
      {copied ? (
        <p className="text-xs">{t('release.copy.copiedLabel')}</p>
      ) : (
        <CopyIcon width="14" height="14" />
      )}
    </button>
  )
}
