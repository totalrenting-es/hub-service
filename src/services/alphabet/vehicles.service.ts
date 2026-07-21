import { proxyRequest } from './proxy.service';

type ProxyHeaders = Record<string, string | undefined>;

export const searchGrouped = (queryString: string, headers: ProxyHeaders) => proxyRequest(`/vehicles/search/grouped${queryString ? `?${queryString}` : ''}`, 'GET', headers);

export const search = (queryString: string, headers: ProxyHeaders) => proxyRequest(`/vehicles/search${queryString ? `?${queryString}` : ''}`, 'GET', headers);
