import { useEffect, useState } from 'react';

import { Link, useNavigate } from '@tanstack/react-router';

import Button from '@/components/ui/Button';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import { Questionnaire } from '@/models/questionnaires';
import { Stamp } from '@/models/stamps';

import StampsSelector from './StampsSelector';
import TableQuestionnaires from './TableQuestionnaires';

interface QuestionnairesProps {
  stamps?: Stamp[];
  questionnaires?: Questionnaire[];
}

/** Display the page with the questionnaires and various filters options. */
export default function Questionnaires({
  stamps = [],
  questionnaires = [],
}: Readonly<QuestionnairesProps>) {
  const [selectedStamp, setSelectedStamp] = useState<string>('DR59-SNDI59');
  const [filter, setFilter] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedStamp) {
      navigate({
        to: '/questionnaires/$stamp',
        params: { stamp: selectedStamp },
      });
    }
  }, [navigate, selectedStamp]);

  return (
    <div>
      <ContentHeader
        title="Questionnaires"
        action={
          <Link to="/questionnaires/new">
            <Button>Créer un questionnaire</Button>
          </Link>
        }
      />
      <ContentMain>
        <div className="grid grid-cols-[1fr_3fr] space-x-4">
          <div>
            <StampsSelector
              selectedStamp={selectedStamp}
              stamps={stamps}
              onSelect={(id) => setSelectedStamp(id)}
            />
          </div>
          <div>
            <Input
              label={'Rechercher un questionnaire'}
              placeholder={'Rechercher un questionnaire'}
              onChange={setFilter}
              displaySearchIcon
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
          <div>Loading...</div>
        )}
      </ContentMain>
    </div>
  );
}
