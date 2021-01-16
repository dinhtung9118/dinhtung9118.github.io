export type IValidError =
  | "required"
  | "number"
  | "pattern"
  | "minLength"
  | "maxLength"
  | "min"
  | "max"
  | "range";

export type IValidErrorMsgs = {
  [key in IValidError]?: string;
};

export type IValidField = { [key in IValidError]?: (value: any) => boolean };

export type IValidList<T> = { [key in keyof T]?: IValidField };
