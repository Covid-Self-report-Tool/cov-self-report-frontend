import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { Facebook, Email } from '@material-ui/icons';

// TODO: use this for goog/fb click handlers
// type ClickForPromise = (
//   event: React.MouseEvent<Element, MouseEvent>
// ) => Promise<void>;

type SignupProviderTypes = 'email' | 'facebook' | 'google';

type SignupLoginBtnConfig = {
  type: SignupProviderTypes;
  disabled?: boolean;
  textOverride?: string; // e.g. "Log in with email" instead of just "Email"
  onClick: (event: any) => void; // TODO: do it right with React.SyntheticEvent
};

const GoogleIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 210 210"
    className="MuiSvgIcon-root"
  >
    <path d="M0 105a105.1 105.1 0 01169-83.2l-24.4 31.7a65 65 0 1022.2 71.5H105V85h105v20a105.1 105.1 0 01-210 0z" />
  </svg>
);

export const SignupLoginBtn: FC<SignupLoginBtnConfig> = ({
  type,
  disabled,
  onClick,
  textOverride,
}) => {
  let btnText = '';
  let startIcon = null;
  let cypressDataAttrib = '';

  switch (type) {
    case 'google':
      btnText = 'Google';
      startIcon = <GoogleIcon />;
      break;
    case 'facebook':
      btnText = 'Facebook';
      startIcon = <Facebook />;
      break;
    default:
      btnText = 'Email';
      startIcon = <Email />;
      cypressDataAttrib = 'register-email';
      break;
  }

  return (
    <Button
      variant="contained"
      data-cy={cypressDataAttrib}
      color="secondary"
      disabled={disabled}
      startIcon={startIcon}
      onClick={onClick}
    >
      {textOverride || btnText}
    </Button>
  );
};
