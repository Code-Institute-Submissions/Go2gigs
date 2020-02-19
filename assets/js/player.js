
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
        videoId: 'Wq4tyDRhU_4',
    });
}

// Function finds a Youtube channel ID with searchTerm and API Key params
function ytSearch(searchTerm) {
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet', {
        params: {
            q: `mix ${searchTerm}`, // string mix with search term returns better playlist results
            type: 'playlist',
            key: 'AIzaSyBM28Mpnwfy8kj3KF8QJF24LsnTMvgqR68'
        }
    })
        .then(function (response) {
            $(function () {
                var plist = response.data && response.data.items[0] && response.data.items[0].id && response.data.items[0].id.playlistId
                console.log(plist);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}