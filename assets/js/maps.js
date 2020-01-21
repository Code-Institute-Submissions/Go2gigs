
// Initialize and add the map
function initMap() {
    // The location of Uluru
    // var location = { lat: latitude, lng: longitude };
    // The map, centered at 0,0
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: { lat: 0, lng: 0 } });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.drop,
        position: { lat: 0, lng: 0 }
    });
}

