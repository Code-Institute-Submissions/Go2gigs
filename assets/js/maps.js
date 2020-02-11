var map;
// Initialize and add the map, centre it and add a marker at the default position of central europe
function initMap() {
    // The map, centered at central europe lat and long
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
}

var markers = []; // an array to store markers

// Adds a marker to the map.
function addMarker(labels, locations, map) {
    for(var i = 0; i < labels.length; i++){
        var marker = new google.maps.Marker({
            position: locations[i],
            label: labels[i],
            map: map
        });
        markers.push(marker);
    }

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++){
        bounds.extend(markers[i]);
    }
    map.fitBounds(bounds);
}

