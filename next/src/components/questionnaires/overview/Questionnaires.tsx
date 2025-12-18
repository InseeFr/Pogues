import { useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Field from '@/components/ui/form/Field';
import Input from '@/components/ui/form/Input';
import { Questionnaire } from '@/models/questionnaires';
import { Stamp } from '@/models/stamps';

import StampsSelector from './StampsSelector';
import TableQuestionnaires from './TableQuestionnaires';

interface QuestionnairesProps {
  selectedStamp: string;
  stamps?: Stamp[];
  questionnaires?: Questionnaire[];
}

/** Display the page with the questionnaires and various filters options. */
export default function Questionnaires({
  selectedStamp,
  stamps = [],
  questionnaires = [],
}: Readonly<QuestionnairesProps>) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('');
  const navigate = useNavigate();

  /** Change page based on stamp chosen from the selector. */
  function handleStampSelection(stamp: string | null) {
    const search = stamp ? { stamp } : undefined;
    navigate({
      to: '/questionnaires',
      search,
    });
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] space-x-4">
        <div>
          <StampsSelector
            selectedStamp={selectedStamp}
            stamps={stamps}
            onSelect={(id) => handleStampSelection(id)}
          />
        </div>
        <div>
          <Field label={t('questionnaires.search')}>
            <Input
              placeholder={t('questionnaires.search')}
              value={filter}
              onValueChange={(value) => setFilter(value)}
            />
          </Field>
        </div>
      </div>
      {questionnaires ? (
        <TableQuestionnaires
          questionnaires={questionnaires.filter((q) => {
            return (
              q.title.toLowerCase().includes(filter.toLowerCase()) ||
              q.id.toLowerCase().includes(filter.toLowerCase())
            );
          })}
        />
      ) : (
        <div>{t('common.loading')}</div>
      )}
    </>
  );
}
