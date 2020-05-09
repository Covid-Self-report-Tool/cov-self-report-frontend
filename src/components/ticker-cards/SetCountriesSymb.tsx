import React, { FC, useContext } from 'react';
import { Link } from '@material-ui/core';

import { GlobalContext } from 'components';
import { SetCountriesSymbTypes } from './types';

export const SetCountriesSymb: FC<SetCountriesSymbTypes> = ({
  className,
  globalStateKey,
}) => {
  const { dispatch } = useContext(GlobalContext);

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({ type: 'SET_COUNTRY_SYMBOLOGY', payload: globalStateKey });
  };

  return (
    <Link href="#" className={className} onClick={handleClick}>
      Show
    </Link>
  );
};
