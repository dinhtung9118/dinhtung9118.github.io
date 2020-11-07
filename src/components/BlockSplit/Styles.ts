import { fade, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 6, 0, 10),
    width: theme.spacing(20),
    height: "100%",
  },
  content: {
    height: "100%",
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    flex: 1,
  },
  noRipper: {
    "& > .MuiTouchRipple-root": { display: "none" },
  },

  block: {
    transition: "flex 0.2s ease-out",
    backgroundColor: theme.palette.divider,
    "&.no-anim": {
      transition: "none",
    },
    "& .selected": {
      backgroundColor: theme.palette.success.main,
    },
    "& .work": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .disable": {
      backgroundColor: fade(theme.palette.error.main, 0.2),
    },
    "&>*": {
      height: "100%",
      padding: 0,
      minWidth: "100%",
    },
    "& .MuiButton-label": {
      writingMode: "vertical-rl",
      textOrientation: "mixed",
      transform: `translateX(${theme.spacing(3)}px)`,
    },
  },
  spliter: {
    position: "relative",
    height: 1,
  },
  spliterTime: {
    position: "absolute",
    top: "50%",
    right: "100%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
  },
  spliterPoint: {
    position: "absolute",
    top: "50%",
    left: "100%",
    transform: "translateY(-50%)",
    minWidth: 0,
    padding: 0,
  },
}));
