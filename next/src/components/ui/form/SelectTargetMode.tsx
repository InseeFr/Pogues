import { useTranslation } from 'react-i18next'

import Checkbox from '@/components/ui/form/Checkbox'
import Label from '@/components/ui/form/Label'
import RadioGroup from '@/components/ui/form/RadioGroup'
import { TargetModes } from '@/models/questionnaires'

type Props = {
  value: Set<TargetModes> | TargetModes[]
  onChange: (value: Set<TargetModes> | TargetModes[]) => void
  multiple: boolean
  disabled?: boolean
  error?: string
}

const TARGET_MODE_OPTIONS = [
  { label: 'CAPI', value: TargetModes.CAPI },
  { label: 'CAWI', value: TargetModes.CAWI },
  { label: 'CATI', value: TargetModes.CATI },
  { label: 'PAPI', value: TargetModes.PAPI },
]

export default function SelectTargetMode({
  value,
  onChange,
  multiple,
  disabled = false,
  error,
}: Readonly<Props>) {
  const { t } = useTranslation()

  const isSet = value instanceof Set

  if (multiple) {
    return (
      <>
        <Label required>{t('questionnaire.common.targetMode')}</Label>
        <div className="flex gap-x-4">
          {TARGET_MODE_OPTIONS.map(({ label, value: modeValue }) => (
            <Checkbox
              key={label}
              label={label}
              checked={isSet ? value.has(modeValue) : value.includes(modeValue)}
              disabled={disabled}
              onChange={(checked) => {
                if (isSet) {
                  const set = value as Set<TargetModes>
                  const next = new Set(set)
                  if (checked) {
                    next.add(modeValue)
                  } else {
                    next.delete(modeValue)
                  }
                  onChange(next)
                } else {
                  const arr = value as TargetModes[]
                  const next = checked
                    ? [...arr, modeValue]
                    : arr.filter((m) => m !== modeValue)
                  onChange(next)
                }
              }}
            />
          ))}
        </div>
        {error ? <div className="text-sm text-error ml-1">{error}</div> : null}
      </>
    )
  }

  const radioValue = isSet
    ? value.values().next().value
    : value.length > 0
      ? value[0]
      : undefined

  return (
    <>
      <RadioGroup
        label={t('questionnaire.common.targetMode')}
        required
        options={TARGET_MODE_OPTIONS}
        value={radioValue}
        disabled={disabled}
        onValueChange={(newValue) => {
          const modeValue = newValue as TargetModes
          if (isSet) {
            onChange(new Set([modeValue]))
          } else {
            onChange([modeValue])
          }
        }}
      />
      {error ? <div className="text-sm text-error ml-1">{error}</div> : null}
    </>
  )
}
