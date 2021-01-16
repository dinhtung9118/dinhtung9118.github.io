import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Container, Typography } from "@material-ui/core";

import {
  doctor as repoDoctor,
  specialties as repoSpecialties,
} from "services/repos";
import { Specialty, Doctor } from "models";
import DoctorForm from "components/FormDoctor";
import useAuthentication from "../../stores/authenticationsStore/authentication";
import {useI18n} from "../../stores/Locale/LocaleStore";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  containerAvatar: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  containerPage:{
    background: theme.palette.common.white,
    width: "600px",
    height: '100%',
  }
}));

type IQueryDatas = {
  specialties: Specialty[];
  data?: Doctor;
};

export default () => {
  const classes = useStyles();
  const [state] = useAuthentication();
  const [datas, setDatas] = useState<IQueryDatas>();
  const i18n = useI18n();

  useEffect(() => {
    (async function getData() {
      if (state?.account && state.account.id) {
        const doctor = await repoDoctor.single(state?.account?.id);
        const { data: specialties } = await repoSpecialties.querySpecialties();
        setUrlAvatar(doctor.avatar || "");
        setDatas({
          specialties: specialties,
          data: doctor,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.account?.id]);

  const ref = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const [urlAvatar, setUrlAvatar] = useState("");

  const fileSlectedHandler = async (event: any) => {
    const dataImg = await repoDoctor.uploadAvatar(
      event.target.files[0],
      event.target.files[0].name,
    );
    setUrlAvatar(dataImg.fileUrl);
  };

  return (
    <Container className={classes.containerPage} component="div">
      <Typography color="inherit" variant="subtitle1" component="div">
        {i18n.pages.profileInfor.editInfor}
      </Typography>
      <div>
        <div className={classes.containerAvatar}>
          <form encType="multipart/form-data" ref={form}>
            <input ref={ref} hidden type="file" onChange={fileSlectedHandler} />
          </form>
          <Avatar className={classes.avatar} src={urlAvatar} />
        </div>
        <div>
          <Button
            onClick={() => ref.current?.click()}
            size="small"
            variant="contained"
            color="primary"
          >
            {i18n.pages.profileInfor.editAvatar}
          </Button>
        </div>
      </div>
      <Typography color="inherit" variant="subtitle1" component="div">
        {i18n.pages.profileInfor.infoDoctor}
      </Typography>
      {datas && (
        <DoctorForm
          submit={async (values) => {
            values.avatar = urlAvatar;
            state && (await repoDoctor.update(state.account.id, values));
          }}
          {...datas}
        />
      )}
    </Container>
  );
};
