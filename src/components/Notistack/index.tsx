import React from "react";
import IconClose from "@material-ui/icons/CloseOutlined";
import { IconButton, Box } from "@material-ui/core";
import { useSnackbar } from "notistack";

export const CloseButton = ({
  name,
  message,
}: {
  name: string;
  message: string;
}) => {
  const { closeSnackbar } = useSnackbar();
  const messages = message.split("\n");
  return (
    <Box
      maxWidth={288}
      marginTop={-10}
      marginBottom={-10}
      fontSize={messages.length > 1 ? 13 : undefined}
    >
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      <IconButton
        size="small"
        style={{ position: "absolute", right: 12, top: 12 }}
        onClick={() => closeSnackbar(name)}
      >
        <IconClose color="action" fontSize={"small"} />
      </IconButton>
    </Box>
  );
};
