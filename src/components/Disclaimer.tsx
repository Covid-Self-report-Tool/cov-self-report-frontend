import React, { FC } from 'react';

export const Disclaimer: FC = () => {
  return (
    <p className="simpler-font" style={{ fontSize: 11 }}>
      <b>Disclaimer:&nbsp;</b>
      This tool will not provide a diagnosis, nor will it count you as a
      confirmed coronavirus case based on symptoms alone. By providing this
      information you will help build a better understanding of how widespread
      COVID-19 may be in your area, and ultimately help communities overcome
      this crisis together. Your privacy and security come first, and only you
      control your data.
    </p>
  );
};
