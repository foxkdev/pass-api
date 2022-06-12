export const Helpers = {
  toString: (value) => {
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
        return value;
      default:
        return JSON.stringify(value);
    }
  },

  toObject: (value) => {
    try {
      return JSON.parse(value);
    } catch {}
    if (!isNaN(Number(value))) {
      return Number(value);
    }
    switch (value.toLowercase().trim()) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return value;
    }
  },
};
