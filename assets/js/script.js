
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

    // When a user submits input save that input to a variable and call the FindSkId function to find a songkick id
    $("#gigForm").submit(function (event) {
        var userInput = String($("#gigInput").val());
        event.preventDefault();
        // call geocode function with userInput
        // geocode(userInput);
        findEvents(userInput);
    });

    // Geocode the user input location into latitude and longitude using google geocode api
    function geocode(location) {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyCEpPkjqOvCqa0kghMNInbffbMj8STkhB4'
            }
        })
            .then(function (response) {
                var latitude = parseFloat(response.data.results[0].geometry.location.lat);
                var longitude = parseFloat(response.data.results[0].geometry.location.lng);
                // call DisplayPoint function with lat and long
                console.log(latitude);
                console.log(longitude);
                DisplayPoint(map, latitude, longitude);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function DisplayPoint(map, latitude, longitude) {
        var latLng = new google.maps.LatLng(latitude, longitude);
        marker.setPosition(latLng);
        map.panTo(latLng);
    }

    function findEvents(userInput) {
        axios.get('https://api.songkick.com/api/3.0/events.json', {
            params: {
                apikey: 'bguT074ohahXwEwu',
                artist_name: userInput
            }
        })
            .then(function (response2) {
                console.log(response2);
                // tabulate(response2);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // $(function tabulate(data) {
    //     $('#table').bootstrapTable({
    //         data: data
    //     });
    // });
}


