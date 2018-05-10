export default (mainPath, query) => {
  let path = `${mainPath}?`;
  Object.keys(query).forEach((key, index, arr) => {
    path += `${key}=${query[key]}`;
    if (arr.length !== index + 1) {
      path += '&';
    }
  });
  return path;
};
