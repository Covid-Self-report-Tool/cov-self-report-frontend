import React, { FC } from 'react';
import { Box } from '@material-ui/core';

export type LegendSymbolTypes = {
  fillColor: string;
  borderColor?: string;
  isCircular?: boolean; // default to square
  size?: string | number;
  borderWidth?: number;
};

export const LegendSymbol: FC<LegendSymbolTypes> = ({
  fillColor,
  borderColor = 'hsl(0, 0%, 89%)',
  isCircular = false,
  size = '0.8em',
  borderWidth = 1,
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
        border={borderWidth}
        borderRadius={isCircular && '100%'}
        height="100%"
        width="100%"
        bgcolor={fillColor}
        borderColor={borderColor}
      />
    </Box>
  );
};
