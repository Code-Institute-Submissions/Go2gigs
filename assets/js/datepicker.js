$( document ).ready(function(){

    	$('.datepicker').datepicker({
        weekStart: 1,
        startDate: "today",
        format: 'dd-mm-yy',
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    });

});