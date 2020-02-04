
// Initialize and add the map, centre it and add a marker at the default position of central europe
var map;

function initMap() {
    // The map, centered at central europe lat and long
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
}

// function displayMarkers(){
//     // Add markers for each location with numeric labels
//     var markers = locations.map(function(location, i) {
//           return new google.maps.Marker({
//             position: location,
//             label: labels[i % labels.length]
//           });
//         });

//     // Add a marker clusterer to manage the markers.
//     var markerCluster = new MarkerClusterer(map, markers,
//         {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
// }

    // DisplayPoint(map, latitude, longitude);

    // function DisplayPoint(map, latitude, longitude) {
    //     var latLng = new google.maps.LatLng(latitude, longitude);
    //     marker.setPosition(latLng);
    //     map.panTo(latLng);
    // }