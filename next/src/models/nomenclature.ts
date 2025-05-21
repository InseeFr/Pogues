export type Nomenclature = {
  id: string;
  label: string;
  version: string;
  externalLink: ExternalLink;
  relatedQuestionNames: string[];
};

type ExternalLink = {
  urn: string;
};
