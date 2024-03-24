import { mapFieldsToString } from './mapFieldsToString';

export function getUrlParams(object: Record<string, any>) {
    return new URLSearchParams(mapFieldsToString(object));
}
