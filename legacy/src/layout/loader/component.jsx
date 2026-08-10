import { RevolvingDot } from 'react-loader-spinner';

const PoguesLoader = () => (
  <RevolvingDot
    wrapperClass="loaderClass"
    color="#facb21"
    height={100}
    width={100}
    ariaLabel="revolving-dot-loading"
    visible={true}
  />
);

export default PoguesLoader;
