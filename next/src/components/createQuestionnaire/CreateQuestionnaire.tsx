import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import toast from 'react-hot-toast';

import { postQuestionnaire } from '@/api/questionnaires';
import { getAccessToken } from '@/api/utils';
import Button, { ButtonType } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Checkbox from '@/components/ui/Checkbox';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Questionnaire, TargetModes } from '@/models/questionnaires';
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

  const mutation = useMutation({
    mutationFn: ({
      questionnaire,
      stamp,
      token,
    }: {
      questionnaire: Questionnaire;
      stamp: string;
      token: string;
    }) => {
      return postQuestionnaire(questionnaire, stamp, token);
    },
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [isCAPI, setIsCAPI] = useState<boolean>(false);
  const [isCAWI, setIsCAWI] = useState<boolean>(false);
  const [isCATI, setIsCATI] = useState<boolean>(false);
  const [isPAPI, setIsPAPI] = useState<boolean>(false);

  const onSubmit = async () => {
    if (user) {
      setIsLoading(true);
      // TODO get token from tanstack router
      const token = await getAccessToken();
      // TODO should never happen and be handled in auth route
      if (!token || user.stamp === undefined) {
        setIsLoading(false);
        toast.error('Unauthorized.');
        return;
      }
      const id = uid();
      const questionnaire = {
        id,
        title,
        targetModes: computeTargetModes({ isCAPI, isCATI, isCAWI, isPAPI }),
      };
      const promise = mutation.mutateAsync(
        { questionnaire, stamp: user.stamp, token: '123' },
        {
          onSuccess: () =>
            void navigate({
              to: '/questionnaire/$questionnaireId',
              params: { questionnaireId: id },
            }),
          onSettled: () => setIsLoading(false),
        },
      );
      toast.promise(promise, {
        loading: 'Loading',
        success: 'Questionnaire created',
        error: (err: Error) => err.toString(),
      });
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
              onChange={(v) => setTitle(v as string)}
              autoFocus
              value={title}
              required
            />
            <div>
              <Label required>Mode de collecte</Label>
              <div className="flex gap-x-4">
                <Checkbox
                  label={'CAPI'}
                  onChange={setIsCAPI}
                  checked={isCAPI}
                />
                <Checkbox
                  label={'CAWI'}
                  onChange={setIsCAWI}
                  checked={isCAWI}
                />
                <Checkbox
                  label={'CATI'}
                  onChange={setIsCATI}
                  checked={isCATI}
                />
                <Checkbox
                  label={'PAPI'}
                  onChange={setIsPAPI}
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
            <ButtonLink to={'/questionnaires'}>Annuler</ButtonLink>
            <Button
              type={ButtonType.Primary}
              onClick={onSubmit}
              isLoading={isLoading}
            >
              Valider
            </Button>
          </div>
        </div>
      </ContentMain>
    </div>
  );
}
