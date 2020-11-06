import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { FnType } from "../../constants/types";
import FormChangePass from "components/FormChangePassword";
import { ChangePasswordFormValues } from "components/FormChangePassword/index.d";

interface ChangePasswordModalProps {
  open: boolean;
  handleClose: FnType;
  handleSubmit: (value: ChangePasswordFormValues) => void;
}
export default function ChangePasswordModal({
  open,
  handleClose,
  handleSubmit,
}: ChangePasswordModalProps) {
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Change password"}
        </DialogTitle>
        <FormChangePass handleClose={handleClose} handleSubmit={handleSubmit} />
      </Dialog>
    </div>
  );
}
