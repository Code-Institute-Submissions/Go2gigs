var map;
var bounds;
var loc;
// Initialize and add the map, centre it and add a marker at the default position of central europe
function initMap() {
    // The map, centered at central europe lat and long
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
}

// Adds a marker to the map.
function addMarker(labels, locations, map) {
    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i < locations.length; i++){
        var marker = new google.maps.Marker({
            position: locations[i],
            map: map
        });
        
        loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
        bounds.extend(loc);
    }

    map.fitBounds(bounds);
    map.panToBounds(bounds);
}

