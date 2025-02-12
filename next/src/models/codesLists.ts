export type CodesList = {
  id: string;
  label: string;
  codes: Code[];
};

export type Code = {
  label: string;
  value: string;
  codes?: Code[];
};
