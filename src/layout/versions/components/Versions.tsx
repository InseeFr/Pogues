import { useEffect, useState } from 'react';

import { getVersions } from '@/api/versions';
import type { Version } from '@/models/versions';

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
  );
}
