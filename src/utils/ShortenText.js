import { MAX_DESCRIPTION_SIZE } from '../configs/config.json';

export default (text) => {
  if (!text) {
    return 'Ошибка в базе данных при получении новости';
  }

  if (text.length > MAX_DESCRIPTION_SIZE) {
    return `${text.slice(0, MAX_DESCRIPTION_SIZE - 5)} ...`;
  }

  return text;
};
