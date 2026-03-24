const PoguesLoaderError = ({ message }) => (
  <div
    style={{
      padding: '1em',
      paddingTop: '2em',
      display: 'flex',
      color: 'red',
    }}
  >
    <h4>{message}</h4>
  </div>
);

export default PoguesLoaderError;
