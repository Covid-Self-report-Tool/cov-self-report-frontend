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

export const TermsAndCond: FC = () => (
  <p>
    Velit exercitation id dolor eu excepteur labore elit et amet dolor. Laboris
    sunt aliquip amet officia ut veniam ad veniam cupidatat ut elit mollit.
    Proident dolor ullamco cupidatat qui ex aute quis tempor ut magna duis
    tempor laboris. Eiusmod enim qui anim eiusmod sit occaecat in quis enim
    excepteur.
  </p>
);

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
