export default (data) => {
  if (data.error) {
    return { type: 'error', text: data.error };
  }
  return { type: 'success', text: data.message };
};
