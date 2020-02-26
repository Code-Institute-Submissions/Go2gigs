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
    map.fitBounds(bounds);
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

    // User Input Form - When the user changes the select option change the user input placeholder
    $('#search-by').change(function () {
        if ($(this).val() == '0') { // search by city
            $('#user-input').attr('placeholder', 'Enter City');
        } else if ($(this).val() == '1') { // search by artist
            $('#user-input').attr('placeholder', 'Enter Artist');
        }
    });

    // User Input Form - When a user submits input save that input to variables and call the findEvents function
    $("#search-btn").on("click", function () {
        if ($('#search-by').val() == '0') { // search by city
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findLocation(userInput, dateFrom, dateTo, findEventLoc); // call findLocation with user input query to find Songkick location ID and assign to variable
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
        fetch(`https://api.songkick.com/api/3.0/search/locations.json?query=${userInput}&apikey=P21PoIr1LmuJzJI7`)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                let location = data.resultsPage.results.location[0].metroArea.id;
                cb(location, dateFrom, dateTo);
            })
            .catch((err) => console.log(err))
    }

    function findEventLoc(locId, dateFrom, dateTo) {
        fetch(`https://api.songkick.com/api/3.0/metro_areas/${locId}/calendar.json?apikey=P21PoIr1LmuJzJI7&min_date=${dateFrom}&max_date=${dateTo}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let event = data.resultsPage.results.event;
                let dataArr = [];
                let locations = [];

                event.forEach(function (entry) {
                    dataArr.push({
                        'Artist': entry.performance[0].displayName,
                        'Date': entry.start.date,
                        'City': entry.location.city,
                        'Venue': entry.venue.displayName,
                    })

                    locations.push({
                        'lat': entry.location.lat,
                        'lng': entry.location.lng
                    })
                })

                $('#table').bootstrapTable({ data: dataArr })

                addMarker(locations, map)
            })
            .catch((err) => console.log(err))
    }

    // FindEvents takes user artist input passes that and apikey to songkick api and obtains a response
    async function findEvents(userInput, dateFrom, dateTo) {
        let dataArr = [];
        let locations = [];
        let pages = 1;

        // Find the total number of pages in the paginated response
        try {
            const response = await fetch(`https://api.songkick.com/api/3.0/events.json?apikey=P21PoIr1LmuJzJI7&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}`)
            console.log(response.json());
        }
        catch (err) {
            console.log('fetch failed', err);
        }
        // fetch(`https://api.songkick.com/api/3.0/events.json?apikey=P21PoIr1LmuJzJI7&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //         let total = data.resultsPage.totalEntries;
        //         console.log(`Total entries is ${total}`);

        // if (total > 50) {
        //     pages = Math.ceil(total / 50);
        // }
        // console.log(`Num of pages is ${pages}`);
    }

// Loop thru the pages in the paginated response and push the relevant data into arrays
// let i;
// let responses = [];
// let fetches = [];
// for (i = 1; i <= pages; i++) {
//     fetches.push(fetch(`https://api.songkick.com/api/3.0/events.json?apikey=P21PoIr1LmuJzJI7&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}&page=${i}`));
// }
// .then((res) => res.json())
// .then((data) => {
//     responses.push(data);
// let event = data.resultsPage.results.event;

// event.forEach(function (entry) {
//     dataArr.push({
//         'Artist': entry.performance[0].displayName,
//         'Date': entry.start.date,
//         'City': entry.location.city,
//         'Venue': entry.venue.displayName,
//     })

//     locations.push({
//         'lat': entry.location.lat,
//         'lng': entry.location.lng
//     })
// })
// $('#table').bootstrapTable({ data: dataArr })

// addMarker(locations, map)
// })
// .catch((err) => console.log(err))
// );

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

// Youtube video
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