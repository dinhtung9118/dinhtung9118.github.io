import React, {useEffect, useState} from 'react';
import {
  Container,
  Box,
  Avatar,
  Grid,
  Typography,
  Button,
  Paper
} from "@material-ui/core";
import {deepOrange, green} from '@material-ui/core/colors';

import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import {RouteList} from "../../routeList";
import {doctor as repoDoctor} from "services/repos";
import useAuthentication
  from "../../stores/AuthenticationsStore/authentication";
import {Doctor} from "../../models";
import ChangePasswordModal from "./ChangePasswordModal";
import {ChangePasswordFormValues} from 'components/FormChangePassword/index.d';
import {useI18n} from "../../stores/Locale/LocaleStore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
  infoEmail: {
    paddingRight: theme.spacing(2)
  },
  infoContent: {
    padding: theme.spacing(2)
  },
  itemInforField: {
    borderBottomWidth: 1,
  }
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const i18n = useI18n();
  const [state] = useAuthentication();
  const [toggole, setToggle] = useState(false);
  const [doctorInfor, setDoctorInfor] = useState<Doctor>();
  const {config} = i18n;

  useEffect(() => {
    (async function getPersistData() {
      if (state.account.id) {
        const doctor = await repoDoctor.single(state.account.id);
        console.log('hdhdhd', doctor);
        setDoctorInfor(doctor);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.account.id]);

  const handleSubmit = (value: ChangePasswordFormValues) => {
    repoDoctor.updatePassword({
      currentPassword: value.currentPassword,
      newPassword: value.newPassword
    });
    setToggle(false);
  };

  return (
    <>
      <Container>
        <Box>
          <Paper className={classes.infoContent}>
            <Box pb={5}>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={1}>
                  <Avatar variant="square" className={classes.square}
                          src={doctorInfor?.avatar}>
                    N
                  </Avatar>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <Grid container>
                    <Typography component="p"
                                variant="body1">{doctorInfor?.fullName}</Typography>
                    <Grid container>
                      <Typography variant="caption" component="span"
                                  className={classes.infoEmail}>{doctorInfor?.email}</Typography>
                      <Typography variant="caption" component="span">Đã xác
                        thực</Typography>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        <Button color="primary" onClick={() => setToggle(true)}>
                          Đổi mật khẩu
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button color="primary"
                                onClick={() => history.push({hash: RouteList.profileEdit,})}>
                          Chỉnh sửa thông tin
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <div>
                  <Typography color="textSecondary" component="span">Ngay
                    sinh: </Typography>
                  <Typography component="span">22/9/1984</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">Quoc
                    tich: </Typography>
                  <Typography component="span">Viet Nam</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div>
                  <Typography color="textSecondary" component="span">Gioi
                    tính: </Typography>
                  <Typography
                    component="span">{config.gender[doctorInfor?.genderCode || "m"]}</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">Dan
                    toc: </Typography>
                  <Typography
                    component="span">{config.nations[doctorInfor?.nationCode || "ki"]}</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
              <div>
                <Typography color="textSecondary" component="span">Job
                  Title: </Typography>
                <Typography
                  component="span">{config.nations[doctorInfor?.jobTitle || ""]}</Typography>
                <Box borderColor="grey.500" borderBottom={1}/>
              </div>
              <div>
                <Typography color="textSecondary" component="span">Diseases: </Typography>{
                doctorInfor?.diseasesConsultantCode &&
                doctorInfor?.diseasesConsultantCode.map((diseases) => {
                  return (
                    <Typography
                      component="span">{config.diseases[diseases || ""]}
                    </Typography>)
                })
              }
                <Box borderColor="grey.500" borderBottom={1}/>
              </div>
            </Grid>
              <Grid item xs={6} sm={6}>
                <div>
                  <Typography color="textSecondary" component="span">Work Place: </Typography>
                  {
                  doctorInfor?.workplace &&
                  doctorInfor?.workplace.map((workplace) => {
                    return (
                      <Typography
                        component="span">{config.hospital[workplace || ""]}
                      </Typography>)
                  })
                }
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">Academic Rank: </Typography>
                  <Typography
                    component="span">{config.academicLevel[doctorInfor?.academicRankCode || ""]}</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <Typography color="textSecondary" variant='body1'>
                    Mo ta
                  </Typography>
                  <Typography variant='body1' paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis
                    tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed
                    adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus
                    euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin
                    fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
                    vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed
                    ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <ChangePasswordModal
              open={toggole}
              handleClose={() => setToggle(false)}
              handleSubmit={handleSubmit}
            />
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default Profile;
