$( document ).ready(function(){

    // When the user changes the select option change the user input placeholder
    $('#search-by').change(function(){       
        if($(this).val() == '0'){ // search by city
            $('#user-input').attr('placeholder','Enter City');
        }else if($(this).val() == '1'){ // search by artist
            $('#user-input').attr('placeholder','Enter Artist');
        }    
    });

    // When a user submits input save that input to a variable and call the findEvents function
    $("#search-form").submit(function(event){
        if($('#search-by').val() == '0'){ // search by city
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findLocation(userInput, dateFrom, dateTo, findEventLoc);
            console.log(locId);
            // var locId = 24475;
            findEventLoc(locId, dateFrom, dateTo);
            event.preventDefault();
        }else if($('#search-by').val() == '1'){ // search by artist
            var userInput = String($("#user-input").val());
            var dateFrom = $("#date-from").val();
            var dateTo = $("#date-to").val();
            findEvents(userInput, dateFrom, dateTo);
            event.preventDefault();
        }
    });

    // FindLocation takes user location input passes that and apikey to songkick api and obtains a location id response
    // This id is then used to find events by location with function findEventLoc
    function findLocation(userInput, dateFrom, dateTo, cb) {

        axios.get('https://api.songkick.com/api/3.0/search/locations.json?', {
            params: {
                query: userInput,
                apikey: 'bguT074ohahXwEwu'
            }
        })
            .then(function (response) {
                $(function() {
                    var id = response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.location[0] && response.data.resultsPage.results.location[0].metroArea && response.data.resultsPage.results.location[0].metroArea.id
                    console.log(id);
                    cb(id, dateFrom, dateTo);

                })
            })
            .catch(function (error) {
                console.log(error);
            })
        return id;
    }

    function findEventLoc(locId, dateFrom, dateTo){
        // var url = "https://api.songkick.com/api/3.0/metro_areas/"+locId+"/calendar.json?apikey=bguT074ohahXwEwu&min_date="+dateFrom+"&max_date="+dateTo;
        // var metro_area_id = locId;
        // var dateF = dateFrom;
        // var dateT = dateTo;

    //     $.ajax({
    //         // "https://api.songkick.com/api/3.0/metro_areas/"+metro_area_id+"/calendar.json?apikey=bguT074ohahXwEwu&min_date="+dateF+"&max_date="+dateT,
    //         url : "https://api.songkick.com/api/3.0/metro_areas/"+metro_area_id+"/calendar.json?apikey=bguT074ohahXwEwu",
    //         type: "GET",
    //         success: function(result){
    //             console.log(result);
    //         },
    //         error: function(error){
    //             console.log(error);
    //         }
    //     })
    // }

        axios.get('https://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}', {
            params: {
                apikey: 'bguT074ohahXwEwu',
                metro_area_id: locId,
                min_date: dateFrom,
                max_date: dateTo
            }
        })
            .then(function (response) {
                $(function() {
                    console.log(response);
                    // The function getData is called here and saved to a variable
                    // var myData = getData(response);

                    // The array data returned from function getData is tabulated using the bootstrap table function
                    // $('#table').bootstrapTable({data: myData.tableData})

                    // Add markers to the map
                    // addMarker(myData.labelData, myData.locationData, map)
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
                apikey: 'bguT074ohahXwEwu',
                artist_name: userInput,
                min_date: dateFrom,
                max_date: dateTo
            }
        })
            .then(function (response) {
                $(function() {
                    // The function getData is called here and saved to a variable
                    console.log(response);
                    var myData = getData(response);

                    // The array data returned from function getData is tabulated using the bootstrap table function
                    $('#table').bootstrapTable({data: myData.tableData})

                    // Add markers to the map
                    addMarker(myData.labelData, myData.locationData, map)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // getLocData takes the response, loops thru the response and push the required response data into array containers
    function getLocData(response) {
        var total = parseInt(response.data.resultsPage.totalEntries);
        console.log(total); // remove this********

        var labels = '';
        var locations = [];
        var data = [];

        for(var i = 0; i < total; i++){
            data.push({
                '#': i+1,
                'Artist': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].displayName,
                'Date': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].start && response.data.resultsPage.results.event[i].start.date,
                'City': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.city,
                'Venue': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].venue && response.data.resultsPage.results.event[i].venue.displayName,
                'Lat': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lat,
                'Lng': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lng
            });

            labels = labels + i.toString();

            locations.push({
                'lat': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lat,
                'lng': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lng
            })
        }
        console.log(data); // remove this**********
        console.log(labels);  // remove this**********
        console.log(locations);  // remove this**********

        // The function returns an object of all array containers
        return {
            tableData: data,
            labelData: labels,
            locationData: locations
        };
    }

    // getData takes the response, loops thru the response and push the required response data into array containers
    function getData(response) {
        var total = parseInt(response.data.resultsPage.totalEntries);
        console.log(total); // remove this********

        var labels = '';
        var locations = [];
        var data = [];

        for(var i = 0; i < total; i++){
            data.push({
                '#': i+1,
                'Artist': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].displayName,
                'Date': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].start && response.data.resultsPage.results.event[i].start.date,
                'City': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.city,
                'Venue': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].venue && response.data.resultsPage.results.event[i].venue.displayName,
                'Lat': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lat,
                'Lng': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lng
            });

            labels = labels + i.toString();

            locations.push({
                'lat': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lat,
                'lng': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lng
            })
        }
        console.log(data); // remove this**********
        console.log(labels);  // remove this**********
        console.log(locations);  // remove this**********

        // The function returns an object of all array containers
        return {
            tableData: data,
            labelData: labels,
            locationData: locations
        };
    }

});