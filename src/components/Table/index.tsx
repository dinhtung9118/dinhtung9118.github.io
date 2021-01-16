import React from "react";

import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import {
  DataType,
  TitleListType,
  TitleWithClassName,
  TTableProps,
} from "./Table.d";
import {useI18n} from "../../stores/Locale/LocaleStore";

const CommonTable: React.FC<TTableProps> = ({
  stickyHeader = true,
  titleList,
  data,
  pathList,
  children,
  className,
}) => {
  const i18n = useI18n();
  const renderEmptyBody = () => {
    return (
      children || (
        <TableRow>
          <TableCell
            align="center"
            colSpan={pathList!.length}
            className="text-center"
          >
            {i18n.system.common.noData}
          </TableCell>
        </TableRow>
      )
    );
  };
  return (
    <TableContainer className={className}>
      <Table stickyHeader={stickyHeader} aria-label="sticky table">
        <TableHead>
          <TableRow>
            {titleList.map((titleElm: TitleListType, index: Number) => {
              if ((titleElm as TitleWithClassName).className !== undefined) {
                const {
                  className,
                  cellRender,
                  align,
                  minWidth,
                } = titleElm as TitleWithClassName;
                return (
                  <TableCell
                    style={{ minWidth: minWidth }}
                    align={align}
                    key={index.toString()}
                    className={className}
                  >
                    {cellRender}
                  </TableCell>
                );
              }
              return (
                <TableCell key={index.toString()} align="left">
                  {titleElm}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length
            ? data.slice().map((row: DataType, indexRow) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={indexRow}>
                    {pathList.map((path, index) => {
                      return (
                        <TableCell
                          key={path}
                          align={
                            (titleList[index] as TitleWithClassName)?.align ||
                            "left"
                          }
                        >
                          {row[path] || ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : renderEmptyBody()}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
