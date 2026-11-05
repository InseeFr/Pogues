import { useTranslation } from 'react-i18next'

import Checkbox from '@/components/ui/form/Checkbox'
import Label from '@/components/ui/form/Label'
import RadioGroup from '@/components/ui/form/RadioGroup'
import { TargetModes } from '@/models/questionnaires'

type Props = {
  value: Set<TargetModes>
  onChange: (value: Set<TargetModes>) => void
  multiple: boolean
  disabled?: boolean
  error?: string
  availableModes?: TargetModes[]
}

const ALL_TARGET_MODES = [
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
  availableModes = ALL_TARGET_MODES.map((m) => m.value),
}: Readonly<Props>) {
  const { t } = useTranslation()

  const modes = ALL_TARGET_MODES.filter((m) => availableModes.includes(m.value))

  if (multiple) {
    return (
      <>
        <Label required>{t('questionnaire.common.targetMode')}</Label>
        <div className="flex gap-x-4">
          {modes.map(({ label, value: modeValue }) => (
            <Checkbox
              key={label}
              label={label}
              checked={value.has(modeValue)}
              disabled={disabled}
              onChange={(checked) => {
                const set = value as Set<TargetModes>
                const next = new Set(set)
                if (checked) {
                  next.add(modeValue)
                } else {
                  next.delete(modeValue)
                }
                onChange(next)
              }}
            />
          ))}
        </div>
        {error ? <div className="text-sm text-error ml-1">{error}</div> : null}
      </>
    )
  }

  const radioValue = value.values().next().value

  return (
    <>
      <RadioGroup
        label={t('questionnaire.common.targetMode')}
        required
        options={modes}
        value={radioValue}
        disabled={disabled}
        onValueChange={(newValue) => {
          const modeValue = newValue as TargetModes
          onChange(new Set([modeValue]))
        }}
      />
      {error ? <div className="text-sm text-error ml-1">{error}</div> : null}
    </>
  )
}
