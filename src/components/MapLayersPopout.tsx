import React, { FC, useContext } from 'react';
import {
  Fab,
  Popover,
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { LayersRounded } from '@material-ui/icons';

import { LayerVisibilityTypes } from 'context/types';
import { GlobalContext } from 'components';

type LayerToggleType = {
  name: string;
  layerId: keyof LayerVisibilityTypes;
};

const LayerToggle: FC<LayerToggleType> = ({ name, layerId }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const checked = state.layerVisibility[layerId];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'TOGGLE_LAYER_VISIBILITY', payload: layerId });
  };

  return (
    <FormControlLabel
      label={name}
      control={
        <Switch
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          checked={checked}
          onChange={handleChange}
          name={layerId}
        />
      }
    />
  );
};

const LayerSymbolRadios: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const currentValue = state.activeCountrySymbKey;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_COUNTRY_SYMBOLOGY', payload: event.target.value });
  };

  return (
    <RadioGroup
      aria-label="gender"
      name="show-countries-by"
      value={currentValue}
      onChange={handleChange}
    >
      <FormControlLabel
        value="total_confirmed"
        control={<Radio />}
        label="Confirmed"
      />
      <FormControlLabel
        value="total_recovered"
        control={<Radio />}
        label="Recovered"
      />
      <FormControlLabel
        value="total_deaths"
        control={<Radio />}
        label="Deaths"
      />
    </RadioGroup>
  );
};

const LayersMenu: FC = () => {
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Map layers</FormLabel>
        <FormGroup>
          <LayerToggle layerId="selfReported" name="Self-reported" />
          <LayerToggle layerId="countries" name="Countries" />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Show countries by</FormLabel>
        <LayerSymbolRadios />
      </FormControl>
    </>
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
        color="primary"
        aria-describedby="long-menu"
        onClick={handleClick}
      >
        <LayersRounded htmlColor="white" />
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
