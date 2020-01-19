$(document).ready(function () {

    // save user input to a variable when submitted
    $("#gigForm").submit(function (event) {
        var userInput = String($("#gigInput").val());
        console.log(userInput);
        event.preventDefault();

        geocode(userInput);

    });

    function geocode(location){
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address:location,
                key:'AIzaSyCEpPkjqOvCqa0kghMNInbffbMj8STkhB4'
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
});