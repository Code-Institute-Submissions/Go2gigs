
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '533',
        videoId: 'Wq4tyDRhU_4',
    });
}

// Function finds a Youtube channel ID with searchTerm and API Key params
function findChannelId(searchTerm) {
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet', {
        params: {
            search_query: searchTerm,
            key: 'AIzaSyBM28Mpnwfy8kj3KF8QJF24LsnTMvgqR68'
        }
    })
        .then(function (response) {
            $(function () {
                console.log(response);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}