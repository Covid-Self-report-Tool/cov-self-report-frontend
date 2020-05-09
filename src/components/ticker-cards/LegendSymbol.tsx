import React, { FC, useContext } from 'react';
import { Box } from '@material-ui/core';

import { LegendSymbolTypes } from './types';
import { GlobalContext } from 'components';

export const LegendSymbol: FC<LegendSymbolTypes> = ({
  fillColor,
  borderColor = 'hsl(0, 0%, 89%)',
  isCircular = false,
  size = '0.8em',
  borderWidth = 1,
  alwaysShow,
  globalStateKey,
}) => {
  const { state } = useContext(GlobalContext);

  return (
    <Box
      width={size}
      height={size}
      display={
        alwaysShow || state.activeCountrySymbKey === globalStateKey
          ? 'flex'
          : 'none'
      }
      marginRight="4px"
      alignItems="center"
    >
      <Box
        border={borderWidth}
        borderRadius={isCircular ? '100%' : 0}
        height="100%"
        width="100%"
        bgcolor={fillColor}
        borderColor={borderColor}
      />
    </Box>
  );
};
