import { baseURLDev } from './Configs/dev.json';
import { baseURLProd } from './Configs/prod.json';

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? baseURLDev : baseURLProd;