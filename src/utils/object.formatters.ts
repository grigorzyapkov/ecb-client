export const arraysToMap = (
  keys: string[],
  values: any[],
  formatter: (v: any) => any = v => v
): { [key: string]: any } => {
  if (!keys || !values || keys.length !== values.length) {
    console.log("dif: " + keys + " " + values);
    return {};
  }

  return keys.reduce((acc, key, idx) => {
    return {
      ...acc,
      [key]: formatter(values[idx]),
    };
  }, {});
};
