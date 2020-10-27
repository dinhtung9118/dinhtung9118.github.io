import moment from "moment";

export interface Data {
  name: string;
  code: string;
  speciality: string;
  time: string;
  status: string;
}

function createData(name: string, code: string, speciality: string, time: string, status: string): Data {
  return { name, code, speciality, time, status };
}

export const bookingMockData = [
  createData('India', 'IN', '1324171354', moment().format('DD MMMM YYYY'), 'Consulting'),
  createData('China', 'CN', '1403500365', moment().format('DD MMMM YYYY'), 'Pending'),
  createData('Italy', 'IT', '60483973', moment().format('DD MMMM YYYY'), ' Ready For Consulting'),
  createData('United States', 'US', '327167434', moment().format('DD MMMM YYYY'), 'Consulting'),
  createData('Canada', 'CA', '37602103', moment().format('DD MMMM YYYY'), 'Consulting'),
  createData('Australia', 'AU', '25475400', moment().format('DD MMMM YYYY'), 'Pending'),
  createData('Germany', 'DE', '83019200', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
  createData('Ireland', 'IE', '4857000', moment().format('DD MMMM YYYY'), 'Pending'),
  createData('Mexico', 'MX', '126577691', moment().format('DD MMMM YYYY'), 'Consulting'),
  createData('Japan', 'JP', '126317000', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
  createData('France', 'FR', '67022000', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
  createData('United Kingdom', 'GB', '67545757', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
  createData('Russia', 'RU', '146793744', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
  createData('Nigeria', 'NG', '200962417', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
  createData('Brazil', 'BR', '210147125', moment().format('DD MMMM YYYY'), 'Ready For Consulting'),
];
