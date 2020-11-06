import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    minHeight: 700,
    display: "flex",
    alignItems: "center",
  },
  grid: {
    flexGrow: 1,
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    textAlign: "left",
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: 500,
  },
  logo: {
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: theme.palette.grey.A100,
    marginBottom: theme.spacing(5),
  },
  form: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(5),
  },
}));
