import * as React from "react";

export interface ChildrenProps {
  data?: object[];
  totals?: number;
}

export interface CommonPageProps {
  children: React.FC<ChildrenProps>;
}
