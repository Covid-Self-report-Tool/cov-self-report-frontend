import React, { FC } from 'react';
import { Box } from '@material-ui/core';

interface LegendSymbolTypes {
  fillColor?: string;
  borderColor?: string;
  symbolClassName?: string;
  size?: string | number;
}

export const LegendSymbol: FC<LegendSymbolTypes> = ({
  fillColor,
  borderColor,
  size = '0.8em',
  symbolClassName,
}) => {
  return (
    <Box
      width={size}
      height={size}
      marginRight="4px"
      display="flex"
      alignItems="center"
    >
      <Box
        className={symbolClassName}
        bgcolor={fillColor}
        borderColor={borderColor || fillColor}
      />
    </Box>
  );
};
