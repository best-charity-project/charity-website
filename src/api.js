import { baseURLDev } from './Configs/dev.json';
import { baseURLProd } from './Configs/prod.json';

let dev = process.env.NODE_ENV !== 'production';
// const prod = process.env.NODE_ENV !== 'development';


export let server = dev ? baseURLDev : baseURLProd;