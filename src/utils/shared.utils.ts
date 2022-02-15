export const isObject = (value: any): value is object =>
  !isNil(value) && typeof value === 'object';

export const isString = (value: any): value is string =>
  typeof value === 'string';

export const isUndefined = (value: any): value is undefined =>
  typeof value === 'undefined';

export const isNil = (value: any): value is null | undefined =>
  isUndefined(value) || value === null;
