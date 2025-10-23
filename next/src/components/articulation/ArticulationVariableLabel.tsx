import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
}

/** Display the translated name of the articulation variable label. */
export default function ArticulationVariableLabel({ label }: Readonly<Props>) {
  const { t } = useTranslation();

  switch (label) {
    case 'Age':
      return t('articulation.variable.age');
    case 'Prénom':
      return t('articulation.variable.firstName');
    case 'Sexe':
      return t('articulation.variable.gender');
  }
}
