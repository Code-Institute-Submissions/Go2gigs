
const songkickAPIKEY = 'P21PoIr1LmuJzJI7';
const youtubeAPIKEY = 'AIzaSyBAFzHI4_cQraakFPRxi4haCOOnxiJaLXI';

let autoSearch;
let locations = [];
let dataArr = [];
let map;
let markers = [];
let checkinDate;
let checkoutDate;
let checkinDp;
let checkoutDp;

/**
 * Load the Youtube Iframe Player API code asynchronously
 * @type {HTMLElement} tag
 */
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * A function which creates a Youtube iframe and player
 * @function onYouTubeIframeAPIReady
 */
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: "280",
        width: "480",
        videoId: ""
    });
}

/**
 * A function to format the data table find column
 * @function findFormatter
 */
function findFormatter() {
    return '<button class="btn"><i class="fas fa-search-location data-fas"></i></button>';
}

/**
 * A function to format the data table play column
 * @function playFormatter
 */
function playFormatter() {
    return '<button class="btn" data-toggle="modal" data-target="videoModal"><i class="fas fa-play data-fas"></i></button>';
}

$(document).ready(function () {
    /**
     * A function to autocomplete city user input
     * @function autocomplete
     */
    function autocomplete() {
        const options = {
            types: ['(cities)']
        };

        autoSearch = document.getElementById('user-input');
        new google.maps.places.Autocomplete(autoSearch, options);
    }

    /**
     * Clear all previous markers from the map array, create the map object
     * Map all locations in locations array to markers array, extend the bounds of the map, fit map to bounds
     * And pan to bounds, create map clusters
     * @function initMap
     */
    function initMap() {
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        const infowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(
            document.getElementById('map'), { zoom: 8, center: { lat: 50.3785, lng: 14.9706 } });

        markers = locations.map(function (location) {
            return new google.maps.Marker({
                position: location,
                map: map
            });
        });

        let content = [];
        content.length = 0;
        for (let i in dataArr) {
            content.push("<p>" + dataArr[i]['Artist'] + "<br>" + dataArr[i]['Venue'] + "<br>" + dataArr[i]['City'] + "</p>");
        }

        markers.forEach(function (item, index) {
            item.addListener('click', function () {
                infowindow.close();
                infowindow.setContent(content[index]);
                infowindow.open(map, item);
            })
        });

        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < locations.length; i++) {
            let loc = new google.maps.LatLng(locations[i].lat, locations[i].lng);
            bounds.extend(loc);
        }
        map.fitBounds(bounds);
        map.panToBounds(bounds);
        new MarkerClusterer(map, markers, { imagePath: '/assets/images/markImages/m' });
    }

    /**
     * Create check in datepicker at html element date-from
     */
    let checkinDiv = $('#date-from').datepicker({
        weekStart: 1,
        startDate: "today",
        format: 'yyyy-mm-dd',
        clearBtn: true,
        autoclose: true,
        todayHighlight: true,
        beforeShowDay: function (date) {
            if (checkoutDate !== undefined) {
                if (date > checkoutDate) {
                    return false;
                }
            }
            return true;
        }
    });

    checkinDp = checkinDiv.data('datepicker');
    checkinDp.update(new Date());

    checkinDiv.on('changeDate', (event) => {
        checkinDate = event.date;
        checkoutDp.update();
        checkinDp.update();
    });

    /**
     * Create check out datepicker at html element date-to
     */
    let checkoutDiv = $('#date-to').datepicker({
        weekStart: 1,
        startDate: "today",
        format: 'yyyy-mm-dd',
        clearBtn: true,
        autoclose: true,
        todayHighlight: true,
        beforeShowDay: function (date) {
            if (checkinDate !== undefined) {
                if (date < checkinDate) {
                    return false;
                }
            }
            return true;
        }
    });
    checkoutDp = checkoutDiv.data('datepicker');
    checkoutDiv.on('changeDate', (event) => {
        checkoutDate = event.date;
        checkinDp.update();
        checkoutDp.update();
    });

    /**
     * When search-by drop down menu is changed change the user input placeholder,
     * if 0 the user has selected search by city
     * if 1 the user has selected search by artist
     * based on the selection either run or remove the autocomplete function
     * @event change
     */
    $('#search-by').change(function () {
        if ($(this).val() == '0') {
            $('#user-input').attr('placeholder', 'Enter City');
            autocomplete();
        } else if ($(this).val() == '1') {
            $('#user-input').attr('placeholder', 'Enter Artist');
            google.maps.event.clearInstanceListeners(autoSearch);
        }
    });

    /**
     * When search function is called store user input data in variables, 
     * call the relevant function and reset the form
     * @type {string} userInput - either a city 0 or an artist 1 string
     * @type {string} dateFrom - a date string in the form YYYY-MM-DD
     * @type {string} dateTo - a date string in the form YYYY-MM-DD
     */
    function search() {
        if ($('#search-by').val() == '0') {
            let userInput = String($("#user-input").val());
            let dateFrom = $("#date-from").val();
            let dateTo = $("#date-to").val();
            findLocEvents(userInput, dateFrom, dateTo);
            event.preventDefault();
        } else if ($('#search-by').val() == '1') {
            let userInput = String($("#user-input").val());
            let dateFrom = $("#date-from").val();
            let dateTo = $("#date-to").val();
            findEvents(userInput, dateFrom, dateTo);
            event.preventDefault();
        }
    };

    /**
     * A function to unhide and to scroll to the results section
     * @function unhideScroll
     */
    function unhideScroll() {
        $("#results-section").removeClass('hidden');
        $('html, body').animate({
            scrollTop: $("#results-section").offset().top
        }, 500);
        document.getElementById('search-form').reset();
        checkinDp.update(new Date());
    }

    /**
     * A function which first fetches from songkick api the relevant metro area id for a location
     * then uses this metro id to fetch events in that area for the date range specified
     * pushes the event data and locations into data array and location array
     * load the data into the bootstrap table, initialises the google map and calls unhideScroll
     * @function findLocEvents
     * @param {string} userInput - a user input city
     * @param {string} dateFrom - a user input date from
     * @param {string} dateTo - a user input date to
     * @type {array} dataArr - array to store event data
     * @type {number} pages - variable to store the number of pages in a paginated response, initialised to 1
     */
    async function findLocEvents(userInput, dateFrom, dateTo) {
        let pages = 1;

        try {
            const idResponse = await fetch(`https://api.songkick.com/api/3.0/search/locations.json?query=${userInput}&apikey=${songkickAPIKEY}`)
            let idData = await idResponse.json();
            let metroId = idData.resultsPage.results.location[0].metroArea.id;

            const response = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${metroId}/calendar.json?apikey=${songkickAPIKEY}&min_date=${dateFrom}&max_date=${dateTo}`)
            let data = await response.json();
            let total = data.resultsPage.totalEntries;

            if (total > 50) {
                pages = Math.ceil(total / 50);
            }
            dataArr.length = 0;
            locations.length = 0;

            for (i = 1; i <= pages; i++) {
                let responsePage = await fetch(`https://api.songkick.com/api/3.0/metro_areas/${metroId}/calendar.json?apikey=${songkickAPIKEY}&min_date=${dateFrom}&max_date=${dateTo}&page=${i}`)
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
        console.log(dataArr.length);
        
        $('#table').bootstrapTable({ data: dataArr });
        $('#table').bootstrapTable('load', dataArr);
        if (dataArr.length > 13){
            $('#table').bootstrapTable( 'resetView' , {height: 600} );
        }else{
            $('#table').bootstrapTable( 'resetView' );
        }
        initMap();
        unhideScroll();
    }

    /**
     * A function which fetches artist events from songkick api for a specified date range
     * calculates how many pages are in the response, loops thru the pages and
     * pushes the event data and locations into data array and location array
     * load the data into the bootstrap table, initialises the google map and calls unhideScroll
     * @function findEvents
     * @param {string} userInput - a user input artist name
     * @param {string} dateFrom - a user input date from
     * @param {string} dateTo - a user input date to
     * @type {array} dataArr - array to store event data
     * @type {number} pages - variable to store the number of pages in a paginated response, initialised to 1
     */
    async function findEvents(userInput, dateFrom, dateTo) {
        let pages = 1;

        try {
            const response = await fetch(`https://api.songkick.com/api/3.0/events.json?apikey=${songkickAPIKEY}&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}`)
            let data = await response.json();
            let total = data.resultsPage.totalEntries;

            if (total > 50) {
                pages = Math.ceil(total / 50);
            }

            dataArr.length = 0;
            locations.length = 0;

            for (i = 1; i <= pages; i++) {
                let responsePage = await fetch(`https://api.songkick.com/api/3.0/events.json?apikey=${songkickAPIKEY}&artist_name=${userInput}&min_date=${dateFrom}&max_date=${dateTo}&page=${i}`)
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

        console.log(dataArr.length);
        
        $('#table').bootstrapTable({ data: dataArr });
        $('#table').bootstrapTable('load', dataArr);
        if (dataArr.length > 13){
            $('#table').bootstrapTable( 'resetView' , {height: 600} );
        }else{
            $('#table').bootstrapTable( 'resetView' );
        }
        initMap();
        unhideScroll();
    }

    /**
     * A bootstrap table event which fires on cell click
     * If clicked cell == Find, use the index position of the clicked cell to look up the
     * corresponding lat and lng in locations array, then pan and zoom to those coordinates on the google map
     * if clicked cell == Play, call function ytSearch with the artist name passed as parameter
     * @event onClickCell
     */
    $('#table').bootstrapTable({
        onClickCell: function (field, value, row, $element) {
            if (field === "Find") {
                let pos = $element.parent().data("index");
                let zoomLocation = { lat: locations[pos].lat, lng: locations[pos].lng };
                map.panTo(zoomLocation);
                map.setZoom(18);
            }
            else if (field === "Play") {
                ytSearch(row.Artist);
            }
        }
    });

    /**
     * An event which fires to stop the YouTube player when the modal is closed
     */
    $("#videoModal").on('hide.bs.modal', function () {
        player.stopVideo()
    })

    $(window).resize(function () {
        $('#table').bootstrapTable('resetView')
    })

    /**
     * A function to search for the top hit YouTube playlist when passed an artist name as a parameter
     * Find the playlist ID and load the YouTube player with the playlist
     * Then set the modal title text and open the modal
     * @param {string} searchTerm - an artist name
     */
    async function ytSearch(searchTerm) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=playlist&key=${youtubeAPIKEY}&maxResults=${1}`)
            let data = await response.json();
            let plist = data.items[0].id.playlistId;
            player.loadPlaylist({
                list: plist
            });
            $('.modal-title').text(`${searchTerm} Playlist`);
            $('#videoModal').modal('show');

        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }

    const searchForm = document.getElementById('search-form');
    /**
     * Event listener added to submit button to check form validation
     */
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        checkInputs();
    });

    const searchBy = document.getElementById('search-by');
    const userText = document.getElementById('user-input');
    const date1 = document.getElementById('date-from');
    const date2 = document.getElementById('date-to');

    /**
     * @function checkInputs
     * A function to validate the values of search form inputs
     */
    function checkInputs() {
        if (searchBy.value === '') {
            setErrorFor(searchBy, 'Please choose');
        } else {
            removeErrorFor(searchBy);
        }
        if (userText.value === '') {
            setErrorFor(userText, 'Required');
        } else {
            removeErrorFor(userText);
        }
        if (date1.value === '') {
            setErrorFor(date1, 'Required');
        } else {
            removeErrorFor(date1);
        }
        if (date2.value === '') {
            setErrorFor(date2, 'Required');
        } else {
            removeErrorFor(date2);
        }
        if (searchBy.value != '' && userText.value != '' && date1.value != '' && date2.value != '') {
            search();
        }
    }

    /**
     * A function to set error class to input html and to assign error message
     * @param {HtmlElement} input - Html element to apply validation error
     * @param {string} message - an error message
     */
    function setErrorFor(input, message) {
        const parentDiv = input.parentElement;
        const text = parentDiv.querySelector('.err-text');

        $(parentDiv).addClass('error'); // add error class
        text.innerText = message; // add error message inside small 
    }

    /**
     * A function to remove error class
     * @param {HtmlElement} input - Html element to remove validation error
     */
    function removeErrorFor(input) {
        const parentDiv = input.parentElement;
        $(parentDiv).removeClass('error'); // remove error class

    }
});