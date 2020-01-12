const APIKEY = "adf68c474262738c411594f324f0d792b92077232dfa1ebda30cb108"
const RACKS_URL = "https://opendata.vancouver.ca/api/records/1.0/search?dataset=bike-racks"
var markers = [];
var markerCluster;
var layers = [];

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.248499, lng: -123.001375},
    zoom: 8,
    mapTypeId: 'roadmap'
  });
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
 
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', async function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }


    // Clear out the old markers.
    if (markers.length > 0) {
      markers.forEach((marker) => {
        if (marker) {
          marker.setMap(null);
        }
      });
    }
    if (markerCluster) {
      markerCluster.clearMarkers();
    }
    markers = [];

    // Get the bike racks near current location
    const bikeRacks = await getBikeRacks();
    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();

    places = parseRadialData(lat, lng, map, 2, bikeRacks);

    var bounds = new google.maps.LatLngBounds();
    if (!(places && places.length != 0)) {
      console.log("There are no places");
      return;
    }
    places.forEach(place => {
      // Create a marker for each place.
      const marker = createMarker(place, map);
      markers.push(marker);
      markerCluster.addMarker(marker);

    });

    /// add function here

    $(document).ready(function() {

          var bike_data = "";
          
          let emptyDiv = $("#location_container");
          emptyDiv.html("");
          
          for(var i = 0; i < places.length ; i++){

            let location_div = $("<div></div>");
            let location_rank = $("<div>"+(i+1)+"</div>")
            let location_rating = $("<div></div>")
          
            bike_data = " " + places[i].Street;
            console.log(places[i].Street);
             
            location_div.append(location_rank);
            location_rank.attr("class","location_ranking");
            location_div.append(bike_data);
            location_div.attr("class","location_info");
            location_div.append(location_rating);
            location_rating.attr("class","location_rating");
            emptyDiv.append(location_div);
          }
  });

  });
}

const codeAddress = (geocoder, address) => {
  geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == 'OK') {
        return results[0].geometry.location
      } else {
          alert('Geocode was not successful for the following reason: ' + status);
      }
  });
}

const getBikeRacks = async () => fetch("/data/bike_racks.json").then(res => res.json());
const getCrimeData = async () => fetch("/data/biketheft.json").then(res => res.json());

const setHeatmapLayer = async (map, lat, lng) => {
  const crimeData = await getCrimeData();

  const coords = crimeData
  .filter(record => record['Latitude'] && record['Longtitude'])
  .map(record => new google.maps.LatLng(parseFloat(record['Latitude']), parseFloat(record['Longitude'])));

  if (layers[0]) {
    layers[0].setMap(null);
    layers[0].pop();
  }
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: coords,
    opacity: 1,
    radius: 2
  });

  heatmap.setMap(map);
  layers.push(heatmap);
}

const parseRadialData = (lat, lng, map, multiplier, data) => {
  return data.filter((bikeRack) => {
    return Math
    .sqrt(Math.abs(bikeRack['Latitude'] - lat) ** 2 + Math.abs(bikeRack['Longitude'] - lng) ** 2) <= 0.001 * multiplier
  });
}

const createMarker = (place, map) => {
  const contentString = `<div class="content">
  <div id="siteNotice"></div>
  <h2 class="heading">${place['Street']}</h2>
  <div class="body-content">
  <h4 class="safety-score">Safety Score: 100%</h4>
  </div>
  </div>`;

  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(place['Latitude'], place['Longitude']),
    map: map,
    title: `${place['Street']}`
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  return marker;
}
