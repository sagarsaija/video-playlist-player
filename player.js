//AJAX calling API for riipen.mediacore.tv

$(document).ready(function() {

  var video_playlist = []
  var curr_video = 0;

  $.ajax({
    method:'GET',
    url: 'https://riipen.mediacore.tv/api2/media',
    dataType: 'json',
    username: "riipenchallenge@mediacore.com", 
    password: "riipenchallenge",
    crossDomain: true,
    success: function (videos) {  
      video_playlist.push(videos.items);
      console.log(video_playlist);
      console.log(videos);
    }
  });
});