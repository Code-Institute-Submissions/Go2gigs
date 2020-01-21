
    // Initialize and add the map
    function initMap() {
        // The map, centered at 0,0
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 4, center: { lat: 0, lng: 0 } });
        // The marker, positioned at 0,0
        var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.drop,
            position: { lat: 0, lng: 0 }
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
                console.log(latitude);
                console.log(longitude);
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


    