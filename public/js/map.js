<<<<<<< Updated upstream
=======
const APIKEY = "adf68c474262738c411594f324f0d792b92077232dfa1ebda30cb108"
const RACKS_URL = "https://opendata.vancouver.ca/api/records/1.0/search?dataset=bike-racks"

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.248499, lng: -123.001375},
    zoom: 8,
    mapTypeId: 'roadmap'
  });
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  var markers = [];
 
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  
  searchBox.addListener('places_changed', async function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    searchresults.forEach(function(icon) {
      icon.setMap(null);
    });
    searchresults = [];

    // For each place, get the icon, name and location.

    var bounds = new google.maps.LatLngBounds();
    if (!(places && places.length != 0)) {
      console.log("There are no places");
      return;
    }
    places.forEach(record => {
      // Create a marker for each place.
      searchresults.push(new google.maps.Marker({
        map: map,

      }));

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  });

  var heatmapData = [new google.maps.LatLng(37.782, -122.447)];
  $.getJSON('/data/biketheft.json', function(data) {
      console.log(data);
      
       $.each(data, function(index, d) {
         // console.log(d.Latitude);
         // console.log(d.Longtitude);
         heatmapData.push(new google.maps.LatLng(d.Latitude, d.Longtitude));
         
       });
       console.log(heatmapData);
     });

   
   var heatmap = new google.maps.visualization.HeatmapLayer({
       data: heatmapData

   });
   heatmap.setMap(map);
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
>>>>>>> Stashed changes
