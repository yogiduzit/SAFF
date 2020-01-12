
const locationInfo = async() => {

const response = await fetch(("../data/bike_racks.json"));
const places = await response.json();
const clickMarker = document.getElementById('click_marker');
// console.log(responseData);

// console.log(places);

const markerArr = [];

// Loops through each item in bike racks, adding to an array
 for (var key in places){
    var marker = places;
    markerArr.push(marker[key]);
}

// Loops through array of bike rack locations
markerArr.forEach( data => {

// clickMarker.addEventListener('click', e=>{
    console.log(data.Street + " " + data.Latitude);
    console.log(data.Street + " " + data.Longitude);
// })
});


clickMarker.addEventListener('click', e=>{
    console.log(markerArr[1].Street + " " + markerArr[1].Latitude);
    console.log(markerArr[1].Street + " " + markerArr[1].Longitude);
})

}

locationInfo();