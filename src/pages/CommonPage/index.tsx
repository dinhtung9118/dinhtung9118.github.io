import React, { useState } from "react";
import { CommonPageProps, Params } from "./CommonPage";
import { useApi } from "../../stores/UseApi/useApi";
import get from "lodash/get";

const initParam = {
  offset: 0,
  limit: 50,
  type: "RE_EXAMINATION",
};

const CommonPage: React.FC<CommonPageProps> = ({
  children,
  dataMappingFunction,
  query,
  advanceFilterList,
}) => {
  const InsideComponent = children;
  const [currentParam, setCurrentParam] = useState<Params>(initParam);
  const result = useApi(() => query(currentParam), [currentParam]);
  const data = get(result, "data", []);
  const handlerAdvanceFilter = (params: { label: string; value: any }[]) => {
    params.forEach((params) => {
      const indexOfParam = advanceFilterList.findIndex(
        (p) => p === params.label,
      );
      if (indexOfParam !== -1) {
        const newParam = currentParam;
        newParam[advanceFilterList[indexOfParam]] = params.value;

        if (!params.value || params.value === "all") {
          delete newParam[advanceFilterList[indexOfParam]];
          setCurrentParam({
            ...newParam,
          });
        } else {
          setCurrentParam({
            ...newParam,
          });
        }
      }
    });
  };

  const renderedData =
    data?.map((item: any, index: number) => dataMappingFunction(item, index)) ||
    [];
  return (
    <>
      <InsideComponent
        data={renderedData}
        totals={0}
        handleOnAddAdvanceFilterField={handlerAdvanceFilter}
      />
    </>
  );
};

export default CommonPage;
