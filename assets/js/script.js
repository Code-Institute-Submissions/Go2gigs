
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
        height: "280",
        width: "460",
        videoId: ""
    });
}

// A function to format the data table find column
function findFormatter() {
    return '<button class="btn"><i class="fas fa-search-location data-fas"></i></button>';
}
// A function to format the data table play column
function playFormatter() {
    return '<button class="btn" data-toggle="modal" data-target="videoModal"><i class="fas fa-play data-fas"></i></button>';
}

$(document).ready(function () {
    // A variable to store the user input element
    let autoSearch
    // A function to autocomplete cities
    function autocomplete() {
        // restict selection to cities only
        let options = {
            types: ['(cities)']
        };
        // Create the search box and link it to the UI element
        autoSearch = document.getElementById('user-input');
        new google.maps.places.Autocomplete(autoSearch, options);
    }
    // A variable to store locations
    let locations = [];
    
    // map variable
    let map

    // marker array to store map markers
    let markers = [];

    // Initialize and add the map
    function initMap() {
        // Clear all previous markers
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // The map, centered at central europe lat and long
        map = new google.maps.Map(
            document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });

        // Map locations array to markers array while calling the callback function on each element
        markers = locations.map(function (location) {
            return new google.maps.Marker({
                position: location,
                map: map
            });
        });
        // Create a bounds variable
        let bounds = new google.maps.LatLngBounds();
        // Extend the bounds of the google map to include all markers in view
        for (let i = 0; i < locations.length; i++) {
            let loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
            bounds.extend(loc);
        }

        // Fit all markers inside map zoom level and pan to center all markers
        map.fitBounds(bounds);
        map.panToBounds(bounds);

        // Add marker clusters by passing in the map, markers array and local image path
        new MarkerClusterer(map, markers, { imagePath: '../assets/images/markImages/m' });
    }

    // Calendar variables
    let checkin_div, checkout_date, checkin_date, checkout_div, checkin_dp, checkout_dp

    // Create checkin datepicker
    checkin_div = $('#date-from').datepicker({
        weekStart: 1,
        startDate: "today",
        format: 'yyyy-mm-dd',
        clearBtn: true,
        autoclose: true,
        todayHighlight: true,
        beforeShowDay: function (date) {
            if (checkout_date !== undefined) {

                if (date > checkout_date) {
                    return false;
                }
            }
            return true;
        }
    });
    // save checkin datepicker for later
    checkin_dp = checkin_div.data('datepicker');

    checkin_div.on('changeDate', (event) => {
        // Save checkin date
        checkin_date = event.date;
        // update checkout datepicker so range dates are displayed
        checkout_dp.update();
        checkin_dp.update();
    });

    // Create checkout datepicker
    checkout_div = $('#date-to').datepicker({
        weekStart: 1,
        format: 'yyyy-mm-dd',
        clearBtn: true,
        autoclose: true,
        todayHighlight: true,
        beforeShowDay: function (date) {
            if (checkin_date !== undefined) {

                if (date < checkin_date) {
                    return false;
                }
            }
            return true;
        }
    });
    // save checkout datepicker for later
    checkout_dp = checkout_div.data('datepicker');

    checkout_div.on('changeDate', (event) => {
        // Save checkin date
        checkout_date = event.date;
        // update checkin datepicker so range dates are displayed
        checkin_dp.update();
        checkout_dp.update();
    });

    // User Input Form - When the user changes the select option change the user input placeholder
    $('#search-by').change(function () {
        if ($(this).val() == '0') { // search by city
            $('#user-input').attr('placeholder', 'Enter City');
            // Run autocomplete function to autocomplete cities
            autocomplete();
        } else if ($(this).val() == '1') { // search by artist
            $('#user-input').attr('placeholder', 'Enter Artist');
            // Remove the autocomplete
            google.maps.event.clearInstanceListeners(autoSearch);
        }
    });

    // User Input Form - When a user submits input save that input to variables and call the relevant function
    $("#search-btn").on("click", function () {
        if ($('#search-by').val() == '0') { // search by city
            // Store user input data in variables
            let userInput = String($("#user-input").val());
            let dateFrom = $("#date-from").val();
            let dateTo = $("#date-to").val();
            findLocEvents(userInput, dateFrom, dateTo); // Function call with user input data
            event.preventDefault();
            // After form submit remove the user input data
            $("#search-form")[0].reset();
        } else if ($('#search-by').val() == '1') { // search by artist
            // Store user input data in variables
            let userInput = String($("#user-input").val());
            let dateFrom = $("#date-from").val();
            let dateTo = $("#date-to").val();
            findEvents(userInput, dateFrom, dateTo); // Function call with user input data
            event.preventDefault();
            // After form submit remove the user input data
            $("#search-form")[0].reset();
        }
    });

    // A function to unhide the results section and to slowly scroll to results
    function unhideScroll() {
        $("#results-section").removeClass('hidden');
        $('html, body').animate({
            scrollTop: $("#results-section").offset().top
        }, 500);
    }

    // findLocEvents fetch response from Songkick API based on a location search
    async function findLocEvents(userInput, dateFrom, dateTo) {
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
            let total = data.resultsPage.totalEntries;
            // If the total results are > 50 calculate the total number of pages
            if (total > 50) {
                pages = Math.ceil(total / 50);
            }
            // Clear out locations array
            locations.length = 0;

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
                        'Play': 'Play',
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
        unhideScroll();
    }

    // FindEvents takes user artist input passes that and apikey to songkick api and obtains a response
    async function findEvents(userInput, dateFrom, dateTo) {
        let dataArr = [];
        let pages = 1;

        try {
            // Find the total number of pages in the paginated response
            const response = await fetch(`https://api.songkick.com/api/3.0/events.json?apikey=${songkickKey}&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}`)
            let data = await response.json();
            console.log(data);
            let total = data.resultsPage.totalEntries;
            // If the total results are > 50 calculate the total number of pages
            if (total > 50) {
                pages = Math.ceil(total / 50);
            }

            // Clear out locations array
            locations.length = 0;

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
        unhideScroll();
    }

    // Fires when user clicks a table cell
    $('#table').bootstrapTable({
        onClickCell: function (field, value, row, $element) {
            // Find the index position of the row of clicked cell
            if (field === "Find") {
                // Find the index position of the clicked element in data array
                let pos = $element.parent().data("index");
                // Find the location to zoom by looking up the corresponding lat and lng in locations array
                let zoomLocation = { lat: locations[pos].lat, lng: locations[pos].lng };
                // Pan and zoom to the location
                map.panTo(zoomLocation);
                map.setZoom(18);
            }
            else if (field === "Play") {
                // call ytSearch with the artist in the selected row
                ytSearch(row.Artist);
            }
        }
    });

    // Fires when the modal hides to stop YouTube video
    $("#videoModal").on('hide.bs.modal', function () {
        player.stopVideo()
    })

    // Function to search for the top hit YouTube video, find the playlist Id and load the player with the playlist
    async function ytSearch(searchTerm) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=mix+${searchTerm}&type=playlist&key=${youtubeKey}&maxResults=${1}`)
            let data = await response.json();
            let plist = data.items[0].id.playlistId;
            console.log(`playlist is: ${plist}`)
            // load the youtube player with the playlist ID found
            player.loadPlaylist({
                list: plist
            });
            // Open the video modal
            $('.modal-title').text(`${searchTerm} Playlist`);
            $('#videoModal').modal('show');
            
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }
});