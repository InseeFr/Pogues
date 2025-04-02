import { useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Clock } from 'iconoir-react';

import type { Version } from '@/models/versions';
import Dictionary from '@/utils/dictionary/dictionary';
import ConfirmInline from '@/widgets/inlineConfirm';

dayjs.locale('fr');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface VersionProps {
  isQuestionnaireModified?: boolean;
  version: Version;
  onLoad: () => void;
}

export default function VersionDetails({
  isQuestionnaireModified = false,
  version,
  onLoad,
}: Readonly<VersionProps>) {
  const [confirmLoad, setConfirmLoad] = useState<boolean>(false);

  const { author, timestamp } = version;

  return (
    <>
      <div className="inline-flex gap-3 items-center">
        <Clock height={18} width={18} />
        <span>{dayjs(timestamp).format('DD-MM-YYYY HH:mm')}</span>
      </div>
      <div className="first-letter:uppercase text-slate-400">
        <span className="italic" title={dayjs(timestamp).format('LLLL')}>
          {dayjs(timestamp).fromNow()},
        </span>{' '}
        {Dictionary.by}{' '}
        <a
          href={`${import.meta.env.VITE_TROMBI_URL}/${author}`}
          target="_blank"
        >
          {author}
        </a>
      </div>
      <div className="inline-flex gap-3 items-center">
        <button className="btn-yellow" onClick={() => setConfirmLoad(true)}>
          {Dictionary.load}
        </button>
        {confirmLoad ? (
          <div className="ml-3">
            <ConfirmInline
              onConfirm={onLoad}
              onCancel={() => setConfirmLoad(false)}
              warningLabel={
                isQuestionnaireModified
                  ? `${Dictionary.modificationsNotSaved}`
                  : undefined
              }
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
