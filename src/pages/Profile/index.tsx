import React, {useEffect, useState} from "react";
import {
  Container,
  Box,
  Avatar,
  Grid,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import {deepOrange, green} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router";
import {RouteList} from "../../routeList";
import {doctor as repoDoctor} from "services/repos";
import useAuthentication
  from "../../stores/authenticationsStore/authentication";
import {Doctor, ModelStatus} from "../../models";
import ChangePasswordModal from "./ChangePasswordModal";
import {ChangePasswordFormValues} from "components/FormChangePassword/index.d";
import {useI18n} from "../../stores/Locale/LocaleStore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
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
    color: "#fff",
    backgroundColor: green[500],
  },
  infoEmail: {
    paddingRight: theme.spacing(2),
  },
  infoContent: {
    padding: theme.spacing(2),
  },
  itemInfoField: {
    borderBottomWidth: 1,
  },
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const i18n = useI18n();
  const [state] = useAuthentication();
  const [toggole, setToggle] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<Doctor>();
  const {config} = i18n;

  useEffect(() => {
    (async function getPersistData() {
      if (state.account.id) {
        const doctor = await repoDoctor.single(state.account.id);
        setDoctorInfo(doctor);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.account.id]);

  const handleSubmit = (value: ChangePasswordFormValues) => {
    repoDoctor.updatePassword({
      currentPassword: value.currentPassword,
      newPassword: value.newPassword,
    });
    setToggle(false);
  };

  const mapStatusToLanguage = (status?: ModelStatus) => {
    if (status === ModelStatus.ACTIVE) {
      return i18n.system.common.active;
    }
    return i18n.system.common.inactive
  };

  return (
    <>
      <Container>
        <Box>
          <Paper className={classes.infoContent}>
            <Box pb={5}>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={1}>
                  <Avatar
                    variant="square"
                    className={classes.square}
                    src={doctorInfo?.avatar}
                  >
                    N
                  </Avatar>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <Grid container>
                    <Typography component="p" variant="body1">
                      {doctorInfo?.fullName}
                    </Typography>
                    <Grid container>
                      <Typography
                        variant="caption"
                        component="span"
                        className={classes.infoEmail}
                      >
                        {doctorInfo?.email}
                      </Typography>
                      <Typography variant="caption" component="span">
                        {mapStatusToLanguage(doctorInfo?.status)}
                      </Typography>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        <Button color="primary" onClick={() => setToggle(true)}>
                          {i18n.pages.profileInfor.changePassword}
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          onClick={() =>
                            history.push({hash: RouteList.profileEdit})
                          }
                        >
                          {i18n.pages.profileInfor.changeInfor}
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
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.birthDay}:{" "}
                  </Typography>
                  <Typography component="span">22/9/1984</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.nationality}:{" "}
                  </Typography>
                  <Typography component="span">Viet Nam</Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.gender}:{" "}
                  </Typography>
                  <Typography component="span">
                    {config.gender[doctorInfo?.genderCode || "m"]}
                  </Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.nationality}:{" "}
                  </Typography>
                  <Typography component="span">
                    {config.nations[doctorInfo?.nationCode || "ki"]}
                  </Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.jobTitle}:{" "}
                  </Typography>
                  <Typography component="span">
                    {config.nations[doctorInfo?.jobTitle || ""]}
                  </Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.diseases}:{" "}
                  </Typography>
                  {doctorInfo?.diseasesConsultantCode &&
                  doctorInfo?.diseasesConsultantCode.map((diseases) => {
                    return (
                      <Typography component="span">
                        {config.diseases[diseases || ""]}
                      </Typography>
                    );
                  })}
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.workSpace}:{" "}
                  </Typography>
                  {doctorInfo?.workplace &&
                  doctorInfo?.workplace.map((workplace) => {
                    return (
                      <Typography component="span">
                        {config.hospital[workplace || ""]}
                      </Typography>
                    );
                  })}
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
                <div>
                  <Typography color="textSecondary" component="span">
                    {i18n.system.common.academicRank}:{" "}
                  </Typography>
                  <Typography component="span">
                    {config.academicLevel[doctorInfo?.academicRankCode || ""]}
                  </Typography>
                  <Box borderColor="grey.500" borderBottom={1}/>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <Typography color="textSecondary" variant="body1">
                    {i18n.system.common.description}:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {doctorInfo?.description}
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
  );
};

export default Profile;
