import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link, Popover } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    padding: theme.spacing(1),
    maxWidth: 300,
    maxHeight: 350,
  },
}));

export const TermsAndCond: FC = () => <p>Terms and conditions here.</p>;

export const TermsAndCondTrigger: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link href="#" onClick={handleClick} aria-describedby="terms-menu">
        Terms and Conditions
      </Link>
      <Popover
        id="terms-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: classes.popover,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Box onClick={handleClose} padding={1}> */}
        <TermsAndCond />
        {/* </Box> */}
      </Popover>
    </>
  );
};
