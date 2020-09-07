import React, {useMemo, useRef, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Container, Typography } from "@material-ui/core";

import {
  clinic as repoClinic,
  doctor as repoDoctor,
  specialties as repoSpecialties,
} from "services/repos";
import { Clinic, Specialty, Doctor } from "models";
import DoctorForm from "components/FormDoctor";
import useAuthentication
  from "../../stores/AuthenticationsStore/authentication";
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
}));

type IQueryDatas = {
  clinics: Clinic[];
  specialties: Specialty[];
  data?: Doctor;
};

export default () => {
  const classes = useStyles();
  const [state] = useAuthentication();
  const [datas, setDatas ]= useState<IQueryDatas>();

  useMemo(()=>{
    (async function getData() {
      if (state?.account && state.account.id) {
      const doctor = await repoDoctor.single(state?.account?.id);
      const clinic = await repoClinic.queryAll();
      const {data: specialties} = await repoSpecialties.querySpecialties();
      setDatas({
        clinics: clinic,
        specialties: specialties,
        data: doctor,
      })
    }
    })();
  },[state?.account?.id])

  const ref = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const [urlAvatar, setUrlAvatar] = useState("");

  const fileSlectedHandler = async (event: any) => {
    const formData = new FormData(form.current!);
    formData.append("file", event.target.files[0]);
    const dataImg = await repoDoctor.uploadAvatar(
      formData,
      event.target.files[0].name,
    );
    setUrlAvatar(dataImg.fileUrl);
  };

  return (
    <Container style={{ maxWidth: "100%", width: "600px" }}>
        <Typography color="inherit" variant="subtitle1" component="div">
          Create Account Doctor
        </Typography>
        <div>
          <div className={classes.containerAvatar}>
            <form encType="multipart/form-data" ref={form}>
              <input
                ref={ref}
                hidden
                type="file"
                onChange={fileSlectedHandler}
              />
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
              Add avatar
            </Button>
          </div>
        </div>
        <Typography color="inherit" variant="subtitle1" component="div">
          Info Doctor
        </Typography>
        {datas && state?.account?.id && (
          <DoctorForm
            submit={async (values) => {
              values.avatar = urlAvatar;
              // state && await repoDoctor.update(state.account.id, values);
            }}
            {...datas}
          />
        )}
    </Container>
  );
};
