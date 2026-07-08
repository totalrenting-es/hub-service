import axios from 'axios';
import config from './index';

/** Cliente base para el identity-service (las cabeceras de credenciales se añaden por petición). */
export const identityClient = axios.create({ baseURL: config.identityServiceUrl });
