import getNomenclaturesContent from './data/get-nomenclatures.json';

type NomenclaturesJSON = {
  nomenclatures: { [key: string]: unknown };
};

const nomenclaturesJSON: NomenclaturesJSON = getNomenclaturesContent;

export function getNomenclatures(): NomenclaturesJSON {
  return nomenclaturesJSON;
}

export function getNomenclature(id: string): unknown {
  return nomenclaturesJSON.nomenclatures[id];
}
