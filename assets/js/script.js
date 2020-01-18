$(document).ready(function(){
    $("#gigForm").submit(function (event) {
        var userInput = $("#gigInput").val();
        console.log(userInput);
        alert("input is:" + userInput);
    });
});