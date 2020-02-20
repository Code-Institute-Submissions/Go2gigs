var map;
var bounds;
var loc;
// Initialize and add the map, centre it and add a marker at the default position of central europe
function initMap() {
    // The map, centered at central europe lat and long
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
}

// Adds markers to the map then sets to map zoom to fit the bounds of all markers
function addMarker(locations, map) {
    bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: locations[i],
            map: map
        });

        loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
        bounds.extend(loc);
    }
    // Fit all markers inside map zoom level and pan to center all markers
    map.fitBounds(bounds, { top: 50 }); // top padding of 50px
    map.panToBounds(bounds);
}

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'Wq4tyDRhU_4',
    });
}

$(document).ready(function () {

    // Calendar datepicker
    $('.datepicker').datepicker({
        weekStart: 1,
        startDate: "today",
        format: 'yyyy-mm-dd',
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });

    // When the user changes the select option change the user input placeholder
    $('#search-by').change(function () {
        if ($(this).val() == '0') { // search by city
            $('#user-input').attr('placeholder', 'Enter City');
        } else if ($(this).val() == '1') { // search by artist
            $('#user-input').attr('placeholder', 'Enter Artist');
        }
    });

    // When a user submits input save that input to variables and call the findEvents function
    $("#search-btn").on("click", function () {
        if ($('#search-by').val() == '0') { // search by city
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findLocation(userInput, dateFrom, dateTo, findEventLoc); // call findLocation function with callback function findEventLoc
            event.preventDefault();
            $("#search-form")[0].reset();
        } else if ($('#search-by').val() == '1') { // search by artist
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findEvents(userInput, dateFrom, dateTo);
            ytSearch(userInput);
            event.preventDefault();
            $("#search-form")[0].reset();
        }
    });

    // FindLocation takes user location input passes that and apikey to songkick api and obtains a location id response
    // This id is then used to find events by location with function findEventLoc
    // cb is a callback function to be called once metro_area_id found
    function findLocation(userInput, dateFrom, dateTo, cb) {
        axios.get('https://api.songkick.com/api/3.0/search/locations.json?', {
            params: {
                query: userInput,
                apikey: 'P21PoIr1LmuJzJI7'
            }
        })
            .then(function (response) {
                $(function () {
                    var id = response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.location[0] && response.data.resultsPage.results.location[0].metroArea && response.data.resultsPage.results.location[0].metroArea.id
                    console.log(id);
                    cb(id, dateFrom, dateTo);

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function findEventLoc(locId, dateFrom, dateTo) {
        axios.get(`https://api.songkick.com/api/3.0/metro_areas/${locId}/calendar.json?`, {
            params: {
                apikey: 'P21PoIr1LmuJzJI7',
                min_date: dateFrom,
                max_date: dateTo
            }
        })
            .then(function (response) {
                $(function () {
                    console.log(response);
                    var myData = getData(response);

                    // The array data returned from function getData is tabulated using the bootstrap table function
                    $('#table').bootstrapTable({ data: myData.tableData })

                    // Add markers to the map
                    addMarker(myData.locationData, map)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // FindEvents takes user artist input passes that and apikey to songkick api and obtains a response
    function findEvents(userInput, dateFrom, dateTo) {
        axios.get('https://api.songkick.com/api/3.0/events.json', {
            params: {
                apikey: 'P21PoIr1LmuJzJI7',
                artist_name: userInput,
                min_date: dateFrom,
                max_date: dateTo
            }
        })
            .then(function (response) {
                $(function () {
                    // The function getData is called here and saved to a variable
                    console.log(response);
                    var myData = getData(response);

                    // The array data returned from function getData is tabulated using the bootstrap table function
                    $('#table').bootstrapTable({ data: myData.tableData })

                    // Add markers to the map
                    addMarker(myData.locationData, map)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // getData takes the response, loops thru the response and pushes the required response data into array containers
    function getData(response) {
        var total = parseInt(response.data.resultsPage.totalEntries);
        var locations = [];
        var data = [];

        for (var i = 0; i < total; i++) {
            data.push({
                'Artist': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].performance[0] && response.data.resultsPage.results.event[i].performance[0].displayName,
                'Date': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].start && response.data.resultsPage.results.event[i].start.date,
                'City': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.city,
                'Venue': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].venue && response.data.resultsPage.results.event[i].venue.displayName,
            });

            locations.push({
                'lat': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lat,
                'lng': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lng
            })
        }

        // The function returns an object of all array containers
        return {
            tableData: data,
            locationData: locations
        };
    }


    // This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function finds a Youtube channel ID with searchTerm and API Key params
    function ytSearch(searchTerm) {
        axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet', {
            params: {
                q: `mix ${searchTerm}`, // string mix with search term returns better playlist results
                type: 'playlist',
                key: 'AIzaSyBM28Mpnwfy8kj3KF8QJF24LsnTMvgqR68'
            }
        })
            .then(function (response) {
                $(function () {
                    var plist = response.data && response.data.items[0] && response.data.items[0].id && response.data.items[0].id.playlistId
                    console.log(plist);
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

});