import { ChangeEvent } from 'react';

import { Dict } from './types';

export const isFunction = (value: any): value is Function => {
  return typeof value === 'function';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number';
};

export const isNotNumber = (value: any): boolean =>
  typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value);

export const toNumber = (value: any): number => {
  if (isNumber(value)) {
    return value;
  }

  return Number.parseFloat(value);
};

export const isNumeric = (value: any): boolean => {
  return value !== null && value - value + 1 >= 0;
};

export const isArray = <T>(value: any): value is Array<T> => {
  return Array.isArray(value);
};

export const isEmptyArray = (value: any): boolean =>
  isArray(value) && value.length === 0;

export const isDefined = (value: any): boolean =>
  typeof value !== 'undefined' || value === undefined;

export const isUndefined = (value: any): value is undefined =>
  typeof value === 'undefined' || value === undefined;

export const isObject = (value: any): value is Dict => {
  const type = typeof value;

  return (
    value !== null &&
    (type === 'object' || type === 'function') &&
    !isArray(value)
  );
};

export const isEmptyObject = (value: any): boolean =>
  isObject(value) && !Object.keys(value).length;

export const isNotEmptyObject = (value: any): value is object =>
  value && !isEmptyObject(value);

export const isNull = (value: any): value is null => value === null;

export const isString = (value: any): value is string =>
  Object.prototype.toString.call(value) === '[object String]';

export const isInputEvent = (value: any): value is ChangeEvent =>
  value && isObject(value) && isObject(value.target);

export const isEmpty = (value: any): boolean => {
  if (isArray(value)) return isEmptyArray(value);

  if (isObject(value)) return isEmptyObject(value);

  if (value === null || !value || value.trim === '') return true;

  return false;
};

export const __DEV__ = process.env.NODE_ENV !== 'production';
