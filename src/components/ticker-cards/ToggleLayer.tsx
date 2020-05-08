import React, { FC, useContext } from 'react';
import { Link } from '@material-ui/core';

import { GlobalContext } from 'components';

type ToggleLayerTypes = {
  className: string;
  visibilityKey: string;
};

export const ToggleLayer: FC<ToggleLayerTypes> = ({
  className,
  visibilityKey = 'selfReported',
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
