import React from 'react';
import {CommonPageProps} from "./CommonPage";
import moment from 'moment'

interface Data {
  name: string;
  code: string;
  speciality: string;
  time: string;
  status: string;
}


const CommonPage: React.FC<CommonPageProps> = ({children}) => {
  const InsideComponent = children;
  function createData(name: string, code: string, speciality: string, time: string, status: string): Data {
    return { name, code, speciality, time, status };
  }

  const rows = [
    createData('India', 'IN', '1324171354', moment().format('DD MMMM YYYY'), ''),
    createData('China', 'CN', '1403500365', moment().format('DD MMMM YYYY'), ''),
    createData('Italy', 'IT', '60483973', moment().format('DD MMMM YYYY'), ''),
    createData('United States', 'US', '327167434', moment().format('DD MMMM YYYY'), ''),
    createData('Canada', 'CA', '37602103', moment().format('DD MMMM YYYY'), ''),
    createData('Australia', 'AU', '25475400', moment().format('DD MMMM YYYY'), ''),
    createData('Germany', 'DE', '83019200', moment().format('DD MMMM YYYY'), ''),
    createData('Ireland', 'IE', '4857000', moment().format('DD MMMM YYYY'), ''),
    createData('Mexico', 'MX', '126577691', moment().format('DD MMMM YYYY'), ''),
    createData('Japan', 'JP', '126317000', moment().format('DD MMMM YYYY'), ''),
    createData('France', 'FR', '67022000', moment().format('DD MMMM YYYY'), ''),
    createData('United Kingdom', 'GB', '67545757', moment().format('DD MMMM YYYY'), ''),
    createData('Russia', 'RU', '146793744', moment().format('DD MMMM YYYY'), ''),
    createData('Nigeria', 'NG', '200962417', moment().format('DD MMMM YYYY'), ''),
    createData('Brazil', 'BR', '210147125', moment().format('DD MMMM YYYY'), ''),
  ];
  return(
    <>
      <InsideComponent
      data={rows}
      totals={0}
      />
    </>
  )
};

export default CommonPage;
