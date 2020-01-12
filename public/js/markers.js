
const locationInfo = async() => {

// Parses bike rack JSON file
const getRackLocation = await fetch(("../data/bike_racks.json"));
const rackLocation= await getRackLocation.json();

// Parses bike theft JSON file
const getCrimeLocation = await fetch("../data/biketheft.json");
const crimeLocation = await getCrimeLocation.json();

console.log(crimeLocation);

// Button: placeholder for a marker
const clickMarker = document.getElementById('click_marker');

// Creates an array to store marker data
const markerArr = [];
// Creates an array to store crime data
const crimeArr = [];

// Loops through each item in bike racks, adding to an array
for (var key in rackLocation){
    var marker = rackLocation;
    markerArr.push(marker[key]);
}

// Loops through each item in crime data, adding to an array
for (var key in crimeLocation){
    var crimeMarker = crimeLocation;
    crimeArr.push(crimeMarker[key]);
}


// Loops through array of bike rack locations
markerArr.forEach( data => {
// clickMarker.addEventListener('click', e=>{
    // console.log(data.Street + " " + data.Latitude);
    // console.log(data.Street + " " + data.Longitude);
// })
});

clickMarker.addEventListener('click', e=>{
    console.log(markerArr[1].Street + " " + markerArr[1].Latitude);
    console.log(markerArr[1].Street + " " + markerArr[1].Longitude);
    console.log(crimeArr[1].HUNDRED_BLOCK + crimeArr[1].Latitude);
    console.log(crimeArr[1].HUNDRED_BLOCK + crimeArr[1].Longtitude);


    const latDifference = (markerArr[1].Latitude - crimeArr[1].Latitude);
    const longDifference = (markerArr[1].Longitude - crimeArr[1].Longtitude);

    console.log("LAT difference = " + latDifference);
    console.log("LONG difference = " + longDifference);

    if(latDifference < 5){
        if(longDifference < 5) {
            // let x = crime number @ that location;
            // var rating = (x-min)/(max-min);
        }
    }
    
})

}

locationInfo();