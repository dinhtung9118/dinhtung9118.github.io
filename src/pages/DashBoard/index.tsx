import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import useAuthentication, {
  AuthStatus,
  storeKey,
} from "../../stores/authenticationsStore/authentication";
import { RouteList } from "../../routeList";
import { useHistory } from "react-router";
import databases from "../../storages";
import {useI18n} from "../../stores/Locale/LocaleStore";

export default () => {
  const [state] = useAuthentication();
  const history = useHistory();
  useEffect(() => {
    (async function getPersistData() {
      const data = await databases.getItem(storeKey).catch((err: Error) => {
        // tslint:disable-next-line:no-console
      });
    })();
    if (state.status === AuthStatus.INITIAL) {
      history.push(RouteList.auth.login);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, history]);

  const i18n = useI18n();
  return (
    <>
      <div>
        <Box height={600}
             display="flex"
             alignItems="center"
             justifyContent="center"
             fontSize={22}
             fontWeight={700}>{i18n.system.common.wellcome}, {state.account.lastName}</Box>
      </div>
    </>
  );
};
