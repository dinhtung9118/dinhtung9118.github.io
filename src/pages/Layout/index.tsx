import React, {useEffect} from 'react';
import clsx from 'clsx';
import Header from "components/Header";
import SideBar from "components/SideBar";
import {makeStyles} from "@material-ui/core/styles";
import useUI from 'stores/UIstore/UIStore';
import {drawerWidth} from "../../components/SideBar/index.style";
import {I18n} from "../../untils";
import {OptionsObject, useSnackbar} from "notistack";
import {connectNotifier} from "../../stores/Connection/Connection";
import {CloseButton} from "../../components/Notistack";
import {errorNotifier} from "../../services/Clients";
import {useI18n} from "../../stores/Locale/LocaleStore";

const useStyles = makeStyles((theme) => ({
  grow:{
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const useConnectSnackBar = (i18n: I18n) => {
  const {
    system: { notices },
    errors,
  } = i18n;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const keyOf = (state: boolean) => `connectStatus-${state}`;

    return connectNotifier.listen(() => {
      const isOnline = connectNotifier.value;

      closeSnackbar(keyOf(!isOnline));

      const props: OptionsObject = isOnline
        ? { variant: "success" }
        : { variant: "error", autoHideDuration: null };

      const key = keyOf(isOnline);

      enqueueSnackbar(
        <CloseButton
          name={key}
          message={isOnline ? notices.online : notices.offline}
        />,
        { key, ...props },
      );
    });
  }, [closeSnackbar, enqueueSnackbar, notices]);

  useEffect(() => {
    let count = 0;
    return errorNotifier.listen((error) => {
      const key = `${error.name || "unKnow"}-${count++}`;

      if (error.name === "offline") {
        enqueueSnackbar(<CloseButton name={key} message={errors.offline} />, {
          key,
          variant: "warning",
        });
      } else {
        enqueueSnackbar(
          <CloseButton
            name={key}
            message={
              errors[error.name] ||
              error.message ||
              error.name ||
              "Some thing went wrong!"
            }
          />,
          { key, variant: "error" },
        );
      }
    });
  }, [enqueueSnackbar, errors]);
};

const Layout: React.FC = ({children}) => {

  const classes = useStyles();
  const [state] = useUI();
  const i18n = useI18n();
  useConnectSnackBar(i18n);
  return (
    <div>
        <Header/>
        <SideBar/>
        <div className={classes.toolbar} />
        <main className={clsx(classes.content, {
          [classes.contentShift]: state.sideBar.collapsed,
        })} >
          {children}
        </main>
    </div>
  )
}

export default Layout;
