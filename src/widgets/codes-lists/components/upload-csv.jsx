import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { WIDGET_COMPONENT_NEW_EDIT } from '../../../constants/dom-constants';
import Dictionary from '../../../utils/dictionary/dictionary';

const { COMPONENT_CLASS, CANCEL, VALIDATE, FOOTERLOOP } =
  WIDGET_COMPONENT_NEW_EDIT;

const UploadCSV = props => {
  const [errorFile, setErrorFile] = useState(false);
  const [dataFile, setDataFile] = useState();
  const [codesFile, setCodesFile] = useState();

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
    encoding: 'utf-8',
  };
  const handleForce = data => {
    setDataFile(data.length);
    setErrorFile(false);
    setCodesFile(data);

    if (data.length > 0) {
      data.forEach(element => {
        if (
          element.label === null ||
          element.value === null ||
          'label' in element === false ||
          'value' in element === false ||
          'parent' in element === false
        ) {
          setErrorFile(true);
        }
      });
    } else {
      setErrorFile(true);
    }
  };

  const validation = () => {
    if (!errorFile) {
      props.getFileCodes(codesFile);
    }
  };

  return (
    <div>
      <div className={COMPONENT_CLASS}>
        <CSVReader
          cssClass="csv-input"
          label={Dictionary.fileImport}
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
          noDrag
        />
        <p>
          {errorFile ? (
            <span style={{ color: 'red' }}>{Dictionary.invalidFile} </span>
          ) : dataFile ? (
            <span style={{ color: 'black' }}>
              {dataFile} {Dictionary.codeNumber}{' '}
            </span>
          ) : (
            false
          )}
        </p>
        <div className={FOOTERLOOP}>
          <button className={VALIDATE} onClick={validation}>
            {Dictionary.validate}
          </button>
          <button onClick={props.closeUpload} className={CANCEL}>
            {Dictionary.cancel}
          </button>
        </div>{' '}
      </div>
    </div>
  );
};

export default UploadCSV;
