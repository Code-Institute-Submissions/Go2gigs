
    // Initialize and add the map
    function initMap() {
        // The map, centered at central europe lat and long
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 4, center: { lat: 50.3785, lng: 14.9706 } });
        // The marker, positioned at central europe lat and long
        var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.drop,
            position: { lat: 50.3785, lng: 14.9706 }
        });

        // save user input to a variable when submitted
        $("#gigForm").submit(function (event) {
            var userInput = String($("#gigInput").val());
            event.preventDefault();
            // call geocode function with userInput
            geocode(userInput);
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
                DisplayPoint(map, latitude, longitude);
            })
            .catch(function (error) {
                console.log(error);
            })
        }

        function DisplayPoint(map, latitude, longitude){

            var latLng = new google.maps.LatLng(latitude, longitude);
            marker.setPosition(latLng);
            map.panTo(latLng);
        }
    }


    