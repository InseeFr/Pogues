import { useEffect, useState } from 'react';

import { getVersions } from '@/api/versions';
import type { Version } from '@/models/versions';

import VersionDetails from './VersionDetails';

type Questionnaire = {
  id: string;
};

interface VersionsProps {
  questionnaire: Questionnaire;
  token: string;
  loadQuestionnaireVersion: (id: string, token: string) => void;
}

export default function Versions({
  questionnaire,
  token,
  loadQuestionnaireVersion,
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
    <div className="space-y-2">
      {versions.map((version) => (
        <VersionDetails
          key={version.id}
          version={version}
          onLoad={() => loadQuestionnaireVersion(version.id, token)}
        />
      ))}
    </div>
  );
}
