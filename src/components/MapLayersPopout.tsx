import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Fab,
  Popover,
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { LayersRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
);

type LayerToggleType = {
  name: string;
};

const LayerToggle: FC<LayerToggleType> = ({ name }) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={handleChange} name={name} />
      }
      label={name}
    />
  );
};

const LayersMenu: FC = () => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Map layers</FormLabel>
      <FormGroup>
        <LayerToggle name="Self-reported" />
        <LayerToggle name="Countries" />
      </FormGroup>
    </FormControl>
  );
};

export const MapLayersPopout: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fab
        size="small"
        aria-label="map layers"
        color="secondary"
        aria-describedby="long-menu"
        onClick={handleClick}
      >
        <LayersRounded />
      </Fab>
      <Popover
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box onClick={handleClose} padding={2}>
          <LayersMenu />
        </Box>
      </Popover>
    </div>
  );
};
