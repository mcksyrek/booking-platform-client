export function filterObjectsListByAttributeValue<T>(
  attribute: string,
  allowedAttributeValues: string[],
  objectsList: T[]
): T[] {
  return objectsList.filter(object =>
    allowedAttributeValues.includes(object[attribute])
  );
}
