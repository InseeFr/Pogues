import { useState } from 'react';

import { FormControl } from '@mui/base/FormControl';
import { Link, useRouteContext } from '@tanstack/react-router';

import { postQuestionnaire } from '@/api/questionnaires';
import { getAccessToken } from '@/api/utils';
import Button, { ButtonType } from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { TargetModes } from '@/models/questionnaires';
import { uid } from '@/utils/utils';

const computeTargetModes = ({
  isCAPI,
  isCAWI,
  isCATI,
  isPAPI,
}: {
  isCAPI: boolean;
  isCAWI: boolean;
  isCATI: boolean;
  isPAPI: boolean;
}): TargetModes[] => {
  const res = [];
  if (isCAPI) res.push(TargetModes.CAPI);
  if (isCAWI) res.push(TargetModes.CAWI);
  if (isCATI) res.push(TargetModes.CATI);
  if (isPAPI) res.push(TargetModes.PAPI);
  return res;
};

/** Create a new questionnaire. */
export default function CreateQuestionnaire() {
  const { user } = useRouteContext({
    from: '__root__',
  });

  const [titre, setTitre] = useState<string>('');
  const [isCAPI, setIsCAPI] = useState<boolean>(false);
  const [isCAWI, setIsCAWI] = useState<boolean>(false);
  const [isCATI, setIsCATI] = useState<boolean>(false);
  const [isPAPI, setIsPAPI] = useState<boolean>(false);

  const onSubmit = async () => {
    if (user) {
      const token = await getAccessToken();
      if (!token || user.stamp === undefined) {
        // 401 error
        return;
      }
      const questionnaire = {
        id: uid(),
        title: titre,
        targetModes: computeTargetModes({ isCAPI, isCATI, isCAWI, isPAPI }),
      };
      postQuestionnaire(questionnaire, user.stamp, token);
    }
  };

  return (
    <div>
      <ContentHeader title="Nouveau questionnaire" />
      <ContentMain>
        <div className="bg-default p-4 border border-default shadow-xl">
          <div className="grid gap-4">
            <Input
              label={'Titre'}
              placeholder={'Titre'}
              onChange={setTitre}
              autoFocus
              value={titre}
              required
            />
            <div>
              <FormControl required>
                <Label>Mode de collecte</Label>
              </FormControl>
              <div className="flex gap-x-4">
                <Checkbox
                  label={'CAPI'}
                  onChange={() => setIsCAPI((v) => !v)}
                  checked={isCAPI}
                />
                <Checkbox
                  label={'CAWI'}
                  onChange={() => setIsCAWI((v) => !v)}
                  checked={isCAWI}
                />
                <Checkbox
                  label={'CATI'}
                  onChange={() => setIsCATI((v) => !v)}
                  checked={isCATI}
                />
                <Checkbox
                  label={'PAPI'}
                  onChange={() => setIsPAPI((v) => !v)}
                  checked={isPAPI}
                />
              </div>
            </div>
            <Input
              label={'Spécification dynamique'}
              value={'Filtres'}
              disabled
              onChange={() => {}}
            />
            <Input
              label={'Spécification des formules'}
              value={'VTL'}
              disabled
              onChange={() => {}}
            />
          </div>
          <div className="flex gap-x-2 mt-6">
            <Link to={'/questionnaires'}>
              <Button>Annuler</Button>
            </Link>
            <Button type={ButtonType.Primary} onClick={onSubmit}>
              Créer le questionnaire
            </Button>
          </div>
        </div>
      </ContentMain>
    </div>
  );
}
