
// Initialize and add the map, centre it and add a marker at the default position of central europe
function initMap() {
    // The map, centered at central europe lat and long
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
    // The marker, positioned at central europe lat and long
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.drop,
        position: { lat: 50.3785, lng: 14.9706 }
    });
}
    // DisplayPoint(map, latitude, longitude);

    // function DisplayPoint(map, latitude, longitude) {
    //     var latLng = new google.maps.LatLng(latitude, longitude);
    //     marker.setPosition(latLng);
    //     map.panTo(latLng);
    // }