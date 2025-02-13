import { useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import ButtonLink from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import { useTranslation } from '@/i18n';
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
  const { t: tQuestionnaires } = useTranslation('questionnairesMessage');
  const { t: tCommon } = useTranslation('commonMessage');
  const [filter, setFilter] = useState<string>('');
  const navigate = useNavigate();

  /** Change page based on stamp chosen from the selector. */
  function handleStampSelection(stamp: string) {
    navigate({
      to: '/questionnaires',
      search: { stamp },
    });
  }

  return (
    <div>
      <ContentHeader
        title="Questionnaires"
        action={
          <ButtonLink to="/questionnaires/new">
            {tQuestionnaires('create')}
          </ButtonLink>
        }
      />
      <ContentMain>
        <div className="grid grid-cols-[1fr_3fr] space-x-4">
          <div>
            <StampsSelector
              selectedStamp={selectedStamp}
              stamps={stamps}
              onSelect={(id) => handleStampSelection(id)}
            />
          </div>
          <div>
            <Input
              label={tQuestionnaires('search')}
              placeholder={tQuestionnaires('search')}
              value={filter}
              onChange={(v) => setFilter(v as string)}
            />
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
          <div>{tCommon('loading')}</div>
        )}
      </ContentMain>
    </div>
  );
}
