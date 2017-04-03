//AJAX calling API for riipen.mediacore.tv

$(document).ready(function() {

  var video_playlist = [];
  var curr_video = 0;

  $.ajax({
    method:'GET',
    url: 'https://riipen.mediacore.tv/api2/media',
    dataType: 'json',
    username: "riipenchallenge@mediacore.com", 
    password: "riipenchallenge",
    crossDomain: true,

    success: function(videos) {
      $.each(videos.items, function(key, video){
        if (video.type === "video"){
          var video_info = {
            id : video.id,
            title : video.title,
            description : video.description_plain,
          };
          video_playlist.push(video_info);
        }
        console.log(video_playlist);
      });
    },
    failure: function (issue) {
        alert(issue + " error occured");
    },
  });
});