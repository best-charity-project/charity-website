import { baseURLDev } from './Configs/dev.json';
import { baseURLProd } from './Configs/prod.json';

let dev = process.env.NODE_ENV !== 'production';
console.log('__comparing', dev);
console.log('__env', process.env.NODE_ENV);
console.log('__process', process.env);
// const prod = process.env.NODE_ENV !== 'development';

export let server = dev ? baseURLDev : baseURLProd;
