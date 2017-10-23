export function getUrlFromCriterias(criterias = {}) {
  let url = '';
  const keys = Object.keys(criterias).filter(key => criterias[key]);

  if (keys.length > 0) {
    url = `?${keys
      .reduce((acc, key) => {
        return [...acc, `${key}=${criterias[key]}`];
      }, [])
      .join('&')}`;
  }

  return url;
}
