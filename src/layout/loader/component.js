import React from 'react';
import Loader from 'react-loader-spinner';

function PoguesLoader() {
  return (
    <Loader
      className="loaderClass"
      type="RevolvingDot"
      color="#facb21"
      height={100}
      width={100}
    />
  );
}

export default PoguesLoader;
