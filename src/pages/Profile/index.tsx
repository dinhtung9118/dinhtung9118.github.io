import React, {useMemo, useState} from 'react';
import {
  Container,
  Box,
  Avatar,
  Grid,
  Typography,
  Button,
  Paper
} from "@material-ui/core";
import {deepOrange, green, grey} from '@material-ui/core/colors';

import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import {RouteList} from "../../routeList";
import {doctor as repoDoctor} from "services/repos";
import useAuthentication
  from "../../stores/AuthenticationsStore/authentication";
import {Doctor} from "../../models";

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
  itemInforField:{
    borderBottomWidth: 1,
  }
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state] = useAuthentication();
  const [doctorInfor, setDoctorInfor] = useState<Doctor>(new Doctor());
  useMemo(()=>{
    (async function getPersistData() {
      if(state.account.id){
        const doctor = await repoDoctor.single(state.account.id);
        setDoctorInfor(doctor);
      }
    })()


  },[])
  return (
    <>
      <Container>
        <Box>
          <Paper className={classes.infoContent}>
            <Box pb={5}>
              <Grid container spacing={2} xs={8} sm={8}>
                <Grid item xs={2} sm={2}>
                  <Avatar variant="square" className={classes.square}>
                    N
                  </Avatar>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography variant="body1">{doctorInfor.fullName}</Typography>
                  <div>
                    <Typography variant="caption" component="span"
                                className={classes.infoEmail}>{doctorInfor.email}</Typography>
                    <Typography variant="caption" component="span">Đã xác
                      thực</Typography>
                  </div>
                  <Grid container spacing={2} xs={12} sm={12}>
                    <Grid item xs={4} sm={4}>
                      <Button color="primary">
                        Đổi mật khẩu
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button color="primary" onClick={()=>history.push({hash: RouteList.profileEdit,})}>
                        Chỉnh sửa thông tin
                      </Button>
                    </Grid>
                  </Grid>


                </Grid>

              </Grid>
            </Box>

            <Grid container spacing={2} xs={12} sm={12}>
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
                  <Typography component="span">Nu</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">Dan
                    toc: </Typography>
                  <Typography component="span">Kinh</Typography>
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
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default Profile;
