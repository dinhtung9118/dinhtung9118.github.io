import React from 'react';
import {ChildrenProps} from "../../CommonPage/CommonPage";
import CommonTable from "../../../components/Table";
import {TitleWithClassName} from "../../../components/Table/Table";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 550,
  },
});

const ConsultationPatient: React.FC<ChildrenProps> = ({
  data,
  totals
                                                      }) =>{

  const classes = useStyles();

  const titleList: TitleWithClassName[] = [{
    className:'',
    cellRender: 'Name Patient',
    align: 'right',
    minWidth: 120,
  },{
    className:'',
    cellRender: 'Code Patient Consultation',
    align: 'right',
    minWidth: 120,
  },{
    className:'',
    cellRender: 'Specitialy',
    align: 'right',
    minWidth: 120,
  },{
    className:'',
    cellRender: 'Time Consultation',
    align: 'right',
    minWidth: 120,
  },{
    className:'',
    cellRender: 'Status',
    align: 'right',
    minWidth: 120,
  }];
  const pathList = [
    'name',
    'code',
    'speciality',
    'time',
    'status',
  ];
  return(
    <>
      <CommonTable
        className={classes.container}
        data={data || []}
        pathList={pathList}
        titleList={titleList}
        stickyHeader={true}/>
    </>
  )
};

export default ConsultationPatient;
