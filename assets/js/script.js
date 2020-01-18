$(document).ready(function(){

    // save user input to a variable when submitted
    $("#gigForm").submit(function (event) {
        var userInput = $("#gigInput").val();

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( {'address': userInput}, function(results, status){

            if (status == google.maps.GeocoderStatus.OK){
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                alert("Lat is;" + latitude);
            }
        });
    });
});