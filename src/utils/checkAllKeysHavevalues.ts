interface MyObject {
  [key: string]: string | number | boolean | undefined;
}

export function checkAllKeysHaveValues(obj: MyObject): boolean {
  return Object.keys(obj).every((key) => {
    const value = obj[key];
    return value !== null && value !== undefined && value !== "";
  });
}
