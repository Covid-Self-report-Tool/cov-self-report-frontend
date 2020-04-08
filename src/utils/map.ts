import L from 'leaflet';

// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction run by leaflet, which doesn't support ES6 arrow func
export const createClusterCustomIcon = function(
  cluster: any // TODO: legit type?
) {
  const value = cluster.getChildCount();
  let diameter = value / 10;

  if (diameter > 100) {
    diameter = 100;
  } else if (diameter < 15) {
    diameter = 15;
  } else {
    diameter = Math.floor(diameter);
  }

  return L.divIcon({
    html: `<div style="
      height: ${diameter}px;
      width: ${diameter}px;
      background: #9370db;
      border: 3px solid #ededed;
      border-radius: 100%;
      text-align: center;
    "></div>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(diameter, diameter, true),
  });
};
