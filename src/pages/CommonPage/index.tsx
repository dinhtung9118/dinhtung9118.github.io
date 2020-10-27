import React, { useState } from 'react';
import { CommonPageProps } from "./CommonPage";
import { useApi } from "../../stores/UseApi/useApi";
import get from 'lodash/get'

const CommonPage: React.FC<CommonPageProps> = ({
                                                 children,
                                                 dataMappingFunction,
                                                 query
                                               }) => {
  const InsideComponent = children;
  const [currentParam, setCurrentParam] = useState();
  const result = useApi(() => query(currentParam),[currentParam]);
  debugger
  const  data = get(result, 'data', []) ;

  const renderedData = data?.map((item: any, index: number) => dataMappingFunction(item, index)) || [];
  return (
    <>
      <InsideComponent
        data={renderedData}
        totals={0}
      />
    </>
  )
};

export default CommonPage;
