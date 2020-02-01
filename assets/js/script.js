$( document ).ready(function(){

    // When a user submits input save that input to a variable and call the findEvents function
    $("#search-form").submit(function(event){
        var userInput = String($("#user-input").val());
        console.log(userInput);
        event.preventDefault();
        findEvents(userInput);
    });

    // FindEvents takes user artist input passes that and apikey to songkick api and obtains a response
    function findEvents(userInput) {
        axios.get('https://api.songkick.com/api/3.0/events.json', {
            params: {
                apikey: 'bguT074ohahXwEwu',
                artist_name: userInput
            }
        })
            .then(function (response) {
                console.log(response);
                getData(response);

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getData(response) {
        var total = parseInt(response.data.resultsPage.totalEntries);
        console.log(total);
    }

    // $(function() {
    //     $('#table').bootstrapTable({
    //         data: data
    //     });
    // });

});