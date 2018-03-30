export default (data, type) => {
  if (type === 'success') {
    return { type, text: data.message };
  }
  if (type === 'error') {
    return { type, text: data.response.data.message };
  }
  return null;
};
