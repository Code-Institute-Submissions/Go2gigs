jQuery(document).ready(function() {
 
    $('.dismiss').on('click', function() {
        $('.sidebar').removeClass('active');
    });
 
    $('.open-menu').on('click', function(e) {
        e.preventDefault();
        $('.sidebar').addClass('active');
    });
});