import { Method, CancelTokenSource } from "axios";
import { AnyObject } from "constants/types";

export interface DataProperty {
  url: string;
  params?: AnyObject | string | undefined;
  method?: Method;
  headers?: AnyObject;
  data?: AnyObject | string;
  cancelTokenSource?: CancelTokenSource;
}
