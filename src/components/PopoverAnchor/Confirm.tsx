import React from "react";

import IconCheck from "@material-ui/icons/Check";
import IconCancel from "@material-ui/icons/CancelOutlined";

import { Box, Typography, Button } from "@material-ui/core";

import { PopoverAnchor, IAnchorProps } from "./Anchor";
import { useI18n } from "stores/Locale/LocaleStore";

export type IPopoverConfirmProps = Omit<IAnchorProps, "children"> & {
  i18n?: {
    title?: string;
    desc?: string;
    accept?: string;
    cancel?: string;
  };
  onAccept: () => any;
};

export const PopoverConfirm = ({
                                 i18n,
                                 onAccept,
                                 ...props
                               }: IPopoverConfirmProps) => {
  const { system } = useI18n();
  return (
    <PopoverAnchor disableBackdropClick {...props}>
      {(close) => (
        <Box px={2} py={1}>
          {i18n?.desc && (
            <Typography variant="subtitle1">{i18n.desc}</Typography>
          )}
          <Box mt={1} display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={async () => {
                close();
                onAccept();
              }}
              color="secondary"
              fullWidth
              startIcon={<IconCheck />}
            >
              {i18n?.accept ?? system.yes}
            </Button>
            <Box px={0.5} />
            <Button
              variant="outlined"
              onClick={close}
              fullWidth
              startIcon={<IconCancel color="error" />}
            >
              {i18n?.cancel ?? system.no}
            </Button>
          </Box>
        </Box>
      )}
    </PopoverAnchor>
  );
};
