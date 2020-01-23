
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
            geocode(userInput);
            FindSkId(userInput);
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
        // First find a songkick metro area id using the songkick locations api, then use this id to find events in that area
        function FindSkId(userInput){
            axios.get('https://api.songkick.com/api/3.0/search/locations.json', {
                params: {
                    query: userInput,
                    apikey: 'bguT074ohahXwEwu'
                }
            })
            .then(function (response) {
                var metroId = parseInt(response.data.resultsPage.results.location[0].metroArea.id);
                console.log(metroId);
                FindAreaEvents(metroId);
            })
            .catch(function (error) {
                console.log(error);
            })
        }

        // Use this metro area id to find events in that area
        function FindAreaEvents(metroId){
            axios.get('https://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json', {
                params: {
                    metro_area_id: metroId,
                    apikey: 'bguT074ohahXwEwu',
                }
            })
            .then(function (response2) {
                console.log(response2);
                // var events = response.data.resultsPage.results.location[0].metroArea.id;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }


    