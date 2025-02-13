import React, { useState } from 'react';

import { useParams } from '@tanstack/react-router';

//import MenuIcon from '@/components/ui/icons/MenuIcon';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import ButtonIcon from '@/components/ui/ButtonIcon';
import ButtonLink, { ButtonType } from '@/components/ui/ButtonLink';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Menu from '@/components/ui/Menu';
//import DeleteIcon from '@/components/ui/icons/DeleteIcon';
import EditIcon from '@/components/ui/icons/EditIcon';
import { type CodesList } from '@/models/codesLists';

import { useTranslation } from '../../i18n';

interface CodesListsProps {
  codesLists: CodesList[];
}

export default function CodesLists({ codesLists }: Readonly<CodesListsProps>) {
  const { questionnaireId } = useParams({ strict: false });
  const { t } = useTranslation('codesListsMessage');
  return (
    <div>
      <ContentHeader
        title={t('title')}
        action={
          <ButtonLink
            to="/questionnaire/$questionnaireId/codes-lists/new"
            params={{ questionnaireId: questionnaireId ?? '' }}
          >
            {t('create')}
          </ButtonLink>
        }
      />
      <ContentMain>
        <div className="bg-default p-4 border border-default shadow-xl">
          <Accordion>
            {codesLists.map((codesList) => (
              <AccordionItem key={codesList.id} title={codesList.label}>
                <CodesListWrapper codesList={codesList} />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContentMain>
    </div>
  );
}

interface CodesListProps {
  codesList: CodesList;
}

function CodesListWrapper({ codesList }: Readonly<CodesListProps>) {
  const { questionnaireId } = useParams({ strict: false });

  const [isDirtyState, setIsDirtyState] = useState<boolean>(false);

  const { t } = useTranslation('commonMessage');

  return (
    <>
      <div className="my-6 space-y-3">
        <div className="grid grid-cols-[auto_auto_1fr] gap-x-6 items-center">
          <div className="font-bold">Valeur</div>
          <div className="font-bold">Label</div>
          <div className="font-bold"></div>
          {codesList.codes.map((code) => (
            <React.Fragment key={code.value}>
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-1 fill-gray-600">
                <span>{code.value}</span>
                <ButtonIcon
                  title={t('edit')}
                  Icon={EditIcon}
                  onClick={() => setIsDirtyState(true)}
                />
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-1 fill-gray-600">
                <span>{code.label}</span>
                <ButtonIcon
                  title={t('edit')}
                  Icon={EditIcon}
                  onClick={() => setIsDirtyState(true)}
                />
              </div>
              <div className="flex items-center">
                <Menu />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {isDirtyState ? (
        <ButtonLink
          to="/questionnaire/$questionnaireId/codes-list/$codesListId"
          buttonType={ButtonType.Primary}
          params={{
            questionnaireId: questionnaireId!,
            codesListId: codesList.id,
          }}
        >
          {t('validate')}
        </ButtonLink>
      ) : null}
    </>
  );
}
