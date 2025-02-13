import { useEffect, useState } from 'react';

import { getVersions } from '@/api/versions';
import type { Version } from '@/models/versions';
import Dictionary from '@/utils/dictionary/dictionary';

import VersionDetails from './VersionDetails';

type Questionnaire = {
  id: string;
};

interface VersionsProps {
  isQuestionnaireModified?: boolean;
  loadQuestionnaireVersion: (id: string, token: string) => void;
  onSuccess: () => void;
  questionnaire: Questionnaire;
  token: string;
}

export default function Versions({
  isQuestionnaireModified = false,
  loadQuestionnaireVersion,
  onSuccess,
  questionnaire,
  token,
}: VersionsProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      async function fetchVersions() {
        const res = await getVersions(questionnaire.id, token);
        setVersions(res);
        setIsLoading(false);
      }
      setIsLoading(true);
      void fetchVersions();
    }
  }, [questionnaire.id, token]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="text-gray-400 mb-3">
        <p>{Dictionary.saveHistoryInfo}</p>
        <p>{Dictionary.saveHistoryLimitInfo}</p>
        <p>
          <a
            className="text-lg"
            target="_blank"
            href="https://inseefr.github.io/Bowie/1._Pogues/Le%20guide/28-versionning/"
          >
            {Dictionary.documentationInfoLink}
          </a>
        </p>
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] gap-x-4 space-y-2 items-center">
        {versions.map((version) => (
          <VersionDetails
            key={version.id}
            isQuestionnaireModified={isQuestionnaireModified}
            onLoad={() => {
              loadQuestionnaireVersion(version.id, token);
              onSuccess();
            }}
            version={version}
          />
        ))}
      </div>
    </>
  );
}
