export type actionType = {
  type: string;
  payload?: {
    field: string;
    value: string;
  };
};

export type initialFormStateType = {
  email: string;
  password: string;
  password2: string;
  emailError: string;
  passwordError: string;
  passwordError2: string;
  captcha: string;
};
