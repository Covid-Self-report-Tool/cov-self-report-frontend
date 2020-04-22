import React, { FC, useContext } from 'react';
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

import { LayerVisibilityTypes } from 'context/types';
import { GlobalContext } from 'components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkbox: {
      paddingBottom: 6,
      paddingTop: 6,
    },
  })
);

type LayerToggleType = {
  name: string;
  layerId: keyof LayerVisibilityTypes;
};

const LayerToggle: FC<LayerToggleType> = ({ name, layerId }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const checked = state.layerVisibility[layerId];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'TOGGLE_LAYER_VISIBILITY', payload: layerId });
  };

  return (
    <FormControlLabel
      label={name}
      control={
        <Checkbox
          className={classes.checkbox}
          size="small"
          checked={checked}
          onChange={handleChange}
          name={layerId}
        />
      }
    />
  );
};

const LayersMenu: FC = () => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Map layers</FormLabel>
      <FormGroup>
        <LayerToggle layerId="selfReported" name="Self-reported" />
        <LayerToggle layerId="countries" name="Countries" />
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
        <Box padding={2}>
          <LayersMenu />
        </Box>
      </Popover>
    </div>
  );
};
