import { environment } from '../../../environments/environment';

export function getBaseUrl(url: string): string  {
    return environment.baseUrl + url;
}
