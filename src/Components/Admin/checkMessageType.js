const checkMessageType = (data) => {
  let message = {};
  if (data.error) {
    message = { type: 'error', text: data.error };
  } else {
    message = { type: 'success', text: data.message };
  }
  return message;
};

export default checkMessageType;
