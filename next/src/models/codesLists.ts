export type CodesList = {
  id: string;
  label: string;
  codes: Code[];
  relatedQuestionNames?: string[];
};

export type Code = {
  label: string;
  value: string;
  codes?: Code[];
};
