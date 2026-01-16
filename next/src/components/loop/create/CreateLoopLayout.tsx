import { useTranslation } from 'react-i18next';

import ContentWrapper from '@/components/layout/ContentWrapper';

type Props = {
    children: React.ReactNode;
};

/** Display "new loop" title and use default content style. */
export default function CreateLoopLayout({ children }: Readonly<Props>) {
    const { t } = useTranslation();

    return (
        <ContentWrapper title={t('loop.create.title')}>
            {children}
        </ContentWrapper>
    );
}
