import React, { createRef } from 'react';
import CSVReader from 'react-csv-reader';

import Dictionary from 'utils/dictionary/dictionary';

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
  fileEncoding: 'UTF-8',
};
const UploadCSV = props => {
  const handleForce = data => {
    console.log(data);
  };

  const buttonRef = React.useRef();

  const openCsvReader = () => {
    if (buttonRef.current) {
      console.log('buttonRef.current.', buttonRef.current);

      buttonRef.current.click();
    }
  };

  return (
    <div>
      <div className="response-format-datatype-text">
        <CSVReader
          ref={buttonRef}
          cssClass="Csv-input"
          label={Dictionary.fileImport}
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
          noClick
          noDrag
        />
        <button onClick={openCsvReader}> sayeb </button>
      </div>
    </div>
  );
};

export default UploadCSV;
