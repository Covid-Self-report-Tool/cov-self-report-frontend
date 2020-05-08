import React, { FC, useContext } from 'react';
import { Link } from '@material-ui/core';

import { ToggleLayerTypes } from './types';
import { GlobalContext } from 'components';

export const ToggleLayer: FC<ToggleLayerTypes> = ({
  className,
  visibilityKey,
}) => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({ type: 'TOGGLE_LAYER_VISIBILITY', payload: visibilityKey });
  };

  return (
    <Link href="#" className={className} onClick={handleClick}>
      {state.layerVisibility[visibilityKey] ? 'Hide' : 'Show'}
    </Link>
  );
};
