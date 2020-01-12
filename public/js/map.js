const APIKEY = "adf68c474262738c411594f324f0d792b92077232dfa1ebda30cb108"
const RACKS_URL = "https://opendata.vancouver.ca/api/records/1.0/search?dataset=bike-racks"
var markers = [];
var markerCluster;

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
        console.log(marker);
        if (marker) {
          marker.setMap(null);
        }
      });
    }
    if (markerCluster) {
      markerCluster.clearMarkers();
    }
    markers = [];

    places = await parseBikeRacks(places[0].geometry.location.lat(), places[0].geometry.location.lng(), map);

    var bounds = new google.maps.LatLngBounds();
    if (!(places && places.length != 0)) {
      console.log("There are no places");
      return;
    }
    places.forEach(place => {
      // Create a marker for each place.
      const marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(place['Latitude'], place['Longitude'])
      });
      markers.push(marker);
      markerCluster.addMarker(marker);
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
const getCrimeData = async () => fetch("/data/bikethefts.json").then(res => res.json());

const parseBikeRacks = async (lat, lng, map) => {
  console.log(lat, lng)
  const bikeRacks = await getBikeRacks();
  return bikeRacks.filter((bikeRack) => {
    return Math
    .sqrt(Math.abs(bikeRack['Latitude'] - lat) ** 2 + Math.abs(bikeRack['Longitude'] - lng) ** 2) <= 0.005
  })
}