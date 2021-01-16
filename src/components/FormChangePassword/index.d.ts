import {FnType} from "../../constants/types";

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordFormProps {
  handleSubmit: (values: ChangePasswordFormValues) => void;
  handleClose: FnType
}
