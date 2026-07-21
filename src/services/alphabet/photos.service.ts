import { proxyRequest } from './proxy.service';

type ProxyHeaders = Record<string, string | undefined>;

export const getFilePhoto = (photoPath: string, headers: ProxyHeaders) => proxyRequest(`/file/photos/${photoPath}`, 'GET', headers);
