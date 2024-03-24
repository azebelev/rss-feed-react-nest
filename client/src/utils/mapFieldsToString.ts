export function mapFieldsToString(object: Record<string, any>) {
    const mappedObject: Record<string, any> = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            mappedObject[key] = String(object[key]);
        }
    }
    return mappedObject;
}
