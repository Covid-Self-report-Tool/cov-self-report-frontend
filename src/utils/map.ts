import L from 'leaflet';

const indivMarkerDiameter = 15;

// https://github.com/Leaflet/Leaflet.markercluster#customising-the-clustered-markers
// NOTE: iconCreateFunction run by leaflet, which doesn't support ES6 arrow func
export const createClusterCustomIcon = function(
  cluster: any // TODO: legit type?
) {
  const value = cluster.getChildCount();
  let diameter = value / 10;

  if (diameter > 100) {
    diameter = 100;
  } else if (diameter < indivMarkerDiameter) {
    diameter = indivMarkerDiameter;
  } else {
    diameter = Math.floor(diameter);
  }

  return L.divIcon({
    html: `<div style="
      height: ${diameter}px;
      width: ${diameter}px;
      background: orange;
      border: 3px solid #ededed;
      border-radius: 100%;
      text-align: center;
    "></div>`,
    iconSize: L.point(diameter, diameter, true),
  });
};

// Individual circular icon (divIcon has more style flexibility than <Circle>)
export const indivMarkerIcon = L.divIcon({
  // Class is arbitrary and unused, just needs to exist to override default bg
  className: 'marker--override',
  iconSize: L.point(indivMarkerDiameter, indivMarkerDiameter, true),
  html: `<div style="
      height: ${indivMarkerDiameter}px;
      width: ${indivMarkerDiameter}px;
      background-color: hsl(39, 100%, 50%);
      border: 2px solid hsl(39, 100%, 40%);
      border-radius: 100%;
    "></div>`,
});
