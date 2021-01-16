import * as React from "react";
import { IQueryPaging } from "services/repos/interface";

export interface ChildrenProps {
  data?: object[];
  totals?: number;
  handleOnAddAdvanceFilterField?: (params: any) => void;
}

export interface Params {
  [field: string]: string | string[] | undefined | null | number;
}

export interface CommonPageProps {
  children: React.FC<ChildrenProps>;
  query: IQueryPaging;
  dataMappingFunction: (item: any, index?: number) => object;
  advanceFilterList: string[];
}
