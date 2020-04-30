import React, { FC } from 'react';
import { Tooltip } from 'react-leaflet';

import { CountryRow } from 'types';
import { prettyPrint } from 'utils';

export const PolygonTooltip: FC<CountryRow> = props => (
  <Tooltip opacity={1}>
    {props.country_name ? (
      <div style={{ width: 225 }}>
        <h2 style={{ whiteSpace: 'pre-wrap', marginTop: 0 }}>
          {props.country_name}
        </h2>
        <h3 style={{ marginBottom: 5 }}>Totals</h3>
        <ul style={{ paddingLeft: 5, margin: 0, listStyleType: 'none' }}>
          <li>
            <b>Confirmed:</b> {prettyPrint(props.total_confirmed)}
          </li>
          <li>
            <b>Deaths:</b> {prettyPrint(props.total_deaths)}
          </li>
          <li>
            <b>Recovered:</b> {prettyPrint(props.total_recovered)}
          </li>
        </ul>
        <h3 style={{ marginBottom: 5 }}>Day changes</h3>
        <ul style={{ paddingLeft: 5, margin: 0, listStyleType: 'none' }}>
          <li>
            <b>Confirmed:</b> {prettyPrint(props.new_confirmed)}
          </li>
          <li>
            <b>Dead:</b> {prettyPrint(props.new_deaths)}
          </li>
          <li>
            <b>Recovered:</b> {prettyPrint(props.new_recovered)}
          </li>
        </ul>
      </div>
    ) : (
      <>
        <h2>{props.NAME_LONG}</h2>
        <b>No Data Available</b>
      </>
    )}
  </Tooltip>
);
