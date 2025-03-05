type TFnProps<T> = {
  arr: T[],
  keys: (keyof T)[]
}

const createObjectsWithCustomKeys = <T extends Record<string, unknown>>({arr, keys}: TFnProps<T>) => {
  return arr.map((item) =>
    keys.reduce((acc, key) => {
      if (item[key] !== undefined) {
        acc[key] = item[key];
      }
      return acc;
    }, {} as Partial<T>)
  );
}

export default createObjectsWithCustomKeys;