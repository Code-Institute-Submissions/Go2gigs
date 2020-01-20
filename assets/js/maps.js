
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var location = {lat: 51.5095, lng: -0.1245};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: location});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: location, map: map});
}