import React, { FC, useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { useHistory } from 'react-router';

export const NavBar: FC = () => {
  const [value, setValue] = useState('/');
  const history = useHistory();

  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
    history.push(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          centered
        >
          <Tab label="Data Tracker" value="/" />
          <Tab label="Predictive Models" value="/models" />
          <Tab label="About" value="/about" />
        </Tabs>
      </AppBar>
    </div>
  );
};
