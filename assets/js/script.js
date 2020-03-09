// A variable to store locations
let locations = [];
let map

// variables to store API keys
let songkickKey = config.songkickKey;
let youtubeKey = config.youtubeKey;

// Youtube video
// This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: "390",
        width: "640",
        videoId: "Wq4tyDRhU_4"
    });
}

// Initialize and add the map
function initMap() {
    // The map, centered at central europe lat and long
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });
    // Create markers array and map locations array to it while calling the callback function on each element
    let markers = locations.map(function (location) {
        return new google.maps.Marker({
            position: location,
            map: map
        });
    });
    // Create a bounds variable
    let bounds = new google.maps.LatLngBounds();
    // Extend the bounds of the google map to include all markers in view
    for (var i = 0; i < locations.length; i++) {
        let loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
        bounds.extend(loc);
    }

    // Fit all markers inside map zoom level and pan to center all markers
    map.fitBounds(bounds);
    map.panToBounds(bounds);

    // Add marker clusters by passing in the map, markers array and local image path
    let markerClusterer = new MarkerClusterer(map, markers,
        { imagePath: '../assets/images/markImages/m' });
}

function findFormatter() {
    return '<button class="btn"><i class="fas fa-search-location"></i></button>';
}

function playFormatter() {
    return '<button class="btn" data-toggle="modal" data-target="videoModal"><i class="fas fa-play"></i></button>';
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
            $('#user-input').attr('placeholder', 'Enter City Country');
        } else if ($(this).val() == '1') { // search by artist
            $('#user-input').attr('placeholder', 'Enter Artist');
        }
    });

    // User Input Form - When a user submits input save that input to variables and call the relevant function
    $("#search-btn").on("click", function () {
        if ($('#search-by').val() == '0') { // search by city
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findLocEvents(userInput, dateFrom, dateTo); // Function call with user input data
            $("#results-section").removeClass('hidden'); // Unhide the results section
            event.preventDefault();
            $("#search-form")[0].reset();
        } else if ($('#search-by').val() == '1') { // search by artist
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findEvents(userInput, dateFrom, dateTo); // Function call with user input data
            $("#results-section").removeClass('hidden'); // Unhide the results section
            event.preventDefault();
            $("#search-form")[0].reset();
        }
    });

    // findLocEvents fetch response from Songkick API based on a location search
    async function findLocEvents(userInput, dateFrom, dateTo) {
        // let locations = [];
        let dataArr = [];
        let pages = 1;

        try {
            // Find the locations metro area id
            const idResponse = await fetch(`https://api.songkick.com/api/3.0/search/locations.json?query=${userInput}&apikey=${songkickKey}`)
            let idData = await idResponse.json();
            let metroId = idData.resultsPage.results.location[0].metroArea.id;

            // Find the total number of pages in the paginated response
            const response = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${metroId}/calendar.json?apikey=${songkickKey}&min_date=${dateFrom}&max_date=${dateTo}`)
            let data = await response.json();
            console.log(data);
            let total = data.resultsPage.totalEntries;
            if (total > 50) {
                pages = Math.ceil(total / 50);
            }

            // Loop thru the pages in the paginated response and push the required data into arrays
            for (i = 1; i <= pages; i++) {
                let responsePage = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${metroId}/calendar.json?apikey=${songkickKey}&min_date=${dateFrom}&max_date=${dateTo}&page=${i}`)
                let responsePageJson = await responsePage.json();
                let event = responsePageJson.resultsPage.results.event;

                event.forEach(function (entry) {
                    dataArr.push({
                        'Artist': entry.performance[0].displayName,
                        'Date': entry.start.date,
                        'City': entry.location.city,
                        'Venue': entry.venue.displayName,
                        'Find': 'Find',
                        'Play': 'Play'
                    })

                    locations.push({
                        'lat': entry.location.lat,
                        'lng': entry.location.lng
                    })
                })
            }
        }
        catch (err) {
            console.log('fetch failed', err);
        }
        // tabulate the data
        $('#table').bootstrapTable({ data: dataArr });
        $('#table').bootstrapTable('load', dataArr); // reload table data when another selection is made
        // Initialise the google map
        console.log(`Locations are ${JSON.stringify(locations)}`);
        initMap();
    }

    // FindEvents takes user artist input passes that and apikey to songkick api and obtains a response
    async function findEvents(userInput, dateFrom, dateTo) {
        // let locations = [];
        let dataArr = [];
        let pages = 1;

        try {
            // Find the total number of pages in the paginated response
            const response = await fetch(`https://api.songkick.com/api/3.0/events.json?apikey=${songkickKey}&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}`)
            let data = await response.json();
            console.log(data);
            let total = data.resultsPage.totalEntries;
            if (total > 50) {
                pages = Math.ceil(total / 50);
            }

            // Loop thru the pages in the paginated response and push the required data into arrays
            for (i = 1; i <= pages; i++) {
                let responsePage = await fetch(`https://api.songkick.com/api/3.0/events.json?apikey=${songkickKey}&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}&page=${i}`)
                let responsePageJson = await responsePage.json();
                let event = responsePageJson.resultsPage.results.event;

                event.forEach(function (entry) {
                    dataArr.push({
                        'Artist': userInput,
                        'Date': entry.start.date,
                        'City': entry.location.city,
                        'Venue': entry.venue.displayName,
                        'Find': 'Find',
                        'Play': 'Play'
                    })

                    locations.push({
                        'lat': entry.location.lat,
                        'lng': entry.location.lng
                    })
                })
            }
        }
        catch (err) {
            console.log('fetch failed', err);
        }
        // tabulate the data
        $('#table').bootstrapTable({ data: dataArr });
        $('#table').bootstrapTable('load', dataArr); // reload table data when another selection is made
        // Initialise the google map
        initMap();
    }

    // Fires when user clicks a table cell
    $('#table').bootstrapTable({
        onClickCell: function (field, value, row, $element) {
            // Find the index position of the row of clicked cell
            if (field === "Find") {
                let pos = $element.parent().data("index");
                let zoomLocation = { lat: locations[pos].lat, lng: locations[pos].lng };
                map.panTo(zoomLocation);
                map.setZoom(18);
            }
            else if (field === "Play") {
                console.log(row.Artist);
                ytSearch(row.Artist);
                // $("#player")
                //     .html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL2B940ABFB08FC274" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
                // startVideo(plist);
            }
        }
    });

    async function ytSearch(searchTerm) {
        try {
            // Find the total number of pages in the paginated response
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=mix+${searchTerm}&type=playlist&key=${youtubeKey}&maxResults=${1}`)
            let data = await response.json();
            let plist = data.items[0].id.playlistId;
            console.log(`plist is: ${plist} and its type is: ${typeof (plist)}`);
            player.loadPlaylist({
                list: plist});
            // $("#player")
            //     .html(`<iframe width="300" height="300" src="https://www.youtube.com/embed/${plist}"></iframe>`);
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }

});