export const nullToUndefined = (value: any) => {
  if (value === null) {
    return undefined;
  }

  return value;
};

export const undefinedToNull = (value: any) => {
  if (value === undefined) {
    return null;
  }

  return value;
};
