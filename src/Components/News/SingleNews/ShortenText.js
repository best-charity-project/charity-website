function shortenText(short) {
  let result = short;
  const size = 240;
  if (!result) {
    return '';
  }

  if (result.length > size) {
    result = `${result.slice(0, size)} ...`;
  }
  return result;
}
export default shortenText;
