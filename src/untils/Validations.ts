import { IValidList, IValidError } from "./Validations.d";

export * from "./Validations.d";

// eslint-disable-next-line no-useless-escape
const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line no-control-regex
const isUnicodeFormat = /[^\u0000-\u00ff]/;

export const validations = {
  requireString(value: string) {
    if (typeof value !== "string") return false;
    return Boolean(value.trim());
  },
  requireNumber: (value: any) => Boolean(parseFloat(value)),
  email(value: any) {
    value = String(value).toLocaleLowerCase();
    return !isUnicodeFormat.test(value) && emailFormat.test(value);
  },
  pattern(reg: RegExp) {
    return (value: any) => typeof value === "string" && reg.test(value);
  },
};

export function createValidation<T extends Object>(list: IValidList<T>) {
  type Key = keyof T;

  return (values: T) => {
    const errors = {} as Record<Key, IValidError>;

    Object.entries(list).forEach(([name, validates]) => {
      const key = name as Key;
      Object.entries<(value: any) => boolean>(validates as {}).forEach(
        ([code, validate]) => {
          if (!errors[key] && validate(values[key]) !== true) {
            errors[key] = code as IValidError;
          }
        },
      );
    });

    return errors;
  };
}
