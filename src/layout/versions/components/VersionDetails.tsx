import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Clock } from 'iconoir-react';

import type { Version } from '@/models/versions';

dayjs.locale('fr');
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface VersionProps {
  version: Version;
  token: string;
}

export default function VersionDetails({ version }: Readonly<VersionProps>) {
  const { author, timestamp } = version;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4">
      <div className="inline-flex gap-3 items-center">
        <Clock height={18} />
        <span>{dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
      <div className="first-letter:uppercase text-slate-400">
        <span className="italic" title={dayjs(timestamp).format('LLLL')}>
          {dayjs(timestamp).fromNow()},
        </span>{' '}
        par <span>{author}</span>
      </div>
    </div>
  );
}
