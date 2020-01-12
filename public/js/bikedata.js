
// Imports module for file system
const fs = require("fs");

// Imports a text file with HTML data
let bikeRackJSON = fs.readFileSync('../data/bike_racks.json', "utf8");

module.exports = { 
  
    // getJSON: function that returns bike rack info
    getJSON: function () {
        console.log("called: getJSON");
        return bikeRackJSON;
    }
  };