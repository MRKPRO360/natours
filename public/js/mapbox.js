// window.addEventListener('DOMContentLoaded', function () {
//   console.log('Dom is mounted buddy!');
// Available when the dom is mounted!
// const locations = document.getElementById('map').dataset.locations;
// console.log(locations);
// });

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicmV6YXVsMzYwIiwiYSI6ImNsanN4Z3BvMzAxOHQzZG1sM3MxNHo3YTIifQ.QCoT8pnpfX6kOyIEtcEUAQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rezaul360/cljsyzo3z01f501qy31y9du43',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 4,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //  Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends the map bounds to include the current locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
