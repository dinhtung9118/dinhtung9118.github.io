export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  submit: (values: LoginFormValues) => Promise<void>;
}
