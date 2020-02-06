$( document ).ready(function(){

    // When a user submits input save that input to a variable and call the findEvents function
    $("#search-form").submit(function(event){
        var userInput = String($("#user-input").val());
        var dateFrom = $("#date-from").val();
        var dateTo = $("#date-to").val();
        findEvents(userInput, dateFrom, dateTo);
        event.preventDefault();
    });

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
                    var myData = getData(response);

                    // The array data returned from function getData is tabulated using the bootstrap table function
                    $('#table').bootstrapTable({data: myData.tableData})

                    displayMarkers(myData.labelData, myData.locationData)

                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    // getData takes the response, loops thru the response and push the required response data into array containers
    function getData(response) {
        var total = parseInt(response.data.resultsPage.totalEntries);
        console.log(total); // remove this********

        var labels = [];
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

            labels.push(i+1);

            locations.push({
                'lat': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lat,
                'lng': response.data && response.data.resultsPage && response.data.resultsPage.results && response.data.resultsPage.results.event[i] && response.data.resultsPage.results.event[i].location && response.data.resultsPage.results.event[i].location.lng
            })
        }
        console.log(data); // remove this**********
        console.log(labels);  // remove this**********
        console.log(locations);  // remove this**********
        // displayMarkers(labels, locations);

        // The function returns an object of all array containers
        return {
            tableData: data,
            labelData: labels,
            locationData: locations
        };
    }

});