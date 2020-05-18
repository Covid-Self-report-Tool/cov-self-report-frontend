import React, { FC } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Facebook, Email } from '@material-ui/icons';

import { AcctReqExplain } from 'components/signup';

// TODO: use this for goog/fb click handlers
// type ClickForPromise = (
//   event: React.MouseEvent<Element, MouseEvent>
// ) => Promise<void>;

type SignupProviderTypes = 'email' | 'facebook' | 'google';

type SignupLoginBtnsType = {
  config: {
    [SignupProviderTypes: string]: {
      onClick: any;
      disabled: boolean;
    };
  };
};

type SignupLoginBtnConfig = {
  type: SignupProviderTypes;
  disabled?: boolean;
  onClick: (event: React.SyntheticEvent) => void;
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
      variant="outlined"
      data-cy={cypressDataAttrib}
      size="small"
      disabled={disabled}
      startIcon={startIcon}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
};

export const SignupLoginBtns: FC<SignupLoginBtnsType> = ({ config }) => {
  return (
    <>
      <Typography variant="h5">
        Choose a signup/login method
        <small>
          <AcctReqExplain />
        </small>
      </Typography>
      <Grid container justify="center" style={{ marginTop: 16 }} spacing={1}>
        {Object.keys(config).map((providerType: string) => {
          // Couldn't figure out how to satisfy TS here
          let myProvider: SignupProviderTypes = providerType as SignupProviderTypes;

          return (
            <Grid key={myProvider} item>
              <SignupLoginBtn
                type={myProvider}
                onClick={config[myProvider].onClick}
                disabled={config[myProvider].disabled}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
