import React, { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useQuery } from 'react-query';

import { SubmittedType, SelfReportedType } from './types';
import { prettyDate } from 'utils/dates';
import { getSubmittedCases } from 'utils/api';
import { createClusterCustomIcon, indivMarkerIcon } from 'utils/map';

export const SubmittedCases: FC<SubmittedType> = ({ data }) => {
  const { status, data: submittedData } = useQuery(
    'submitted',
    getSubmittedCases,
    { staleTime: 300000 }
  );

  if (status === 'loading') {
    return <></>;
  }

  const submissions = submittedData ? submittedData : [];

  return (
    <MarkerClusterGroup
      showCoverageOnHover={false}
      iconCreateFunction={createClusterCustomIcon}
      disableClusteringAtZoom={10}
      spiderfyOnMaxZoom
      maxClusterRadius={5}
    >
      {submissions.map((selfReportedItem: SelfReportedType, i: number) => (
        <Marker
          key={i}
          position={[selfReportedItem.lat, selfReportedItem.lng]}
          icon={indivMarkerIcon}
        >
          <Popup maxWidth={200}>
            <h2>{selfReportedItem.address}</h2>
            <p>
              <small>
                <i>
                  Self-reported location{' '}
                  {selfReportedItem.date
                    ? `submitted ${prettyDate(new Date(selfReportedItem.date))}`
                    : ''}
                </i>
              </small>
            </p>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};
