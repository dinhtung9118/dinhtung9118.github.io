export interface TitleWithClassName {
  className: string;
  cellRender: string | React.ReactNode;
  align?: 'right';
  minWidth: number;
}
interface DataType {
  [index: string]: any;
}

export type TitleListType = string | React.ReactNode | TitleWithClassName;

export interface TTableProps {
  stickyHeader: boolean;
  titleList: TitleListType[];
  pathList: string[];
  data: object[];
  dataKey?: string;
  className?: string;
  children?: React.ReactNode;
  readonly?: boolean;
  className: string;
}
