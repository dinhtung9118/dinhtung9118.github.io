import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    background: theme.palette.common.white,
    height: "100%",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));
