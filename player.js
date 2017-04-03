var video_player = function() {
  var video_playlist = [];
  var curr_video = 0;

  function play_video(index) {
    //console.log(video_playlist[index]);

    //$('#video-player')[0].src = "https://riipen.mediacore.tv/media/id:" + video_playlist[index].id + "/embed_player?iframe=True"
    var iframe = $('#video-player')[0];
    iframe.src = "https://riipen.mediacore.tv/media/id:" + video_playlist[index].id + "/embed_player";
    $('#title').html(video_playlist[index].title);
    $('#description').html(video_playlist[index].description);

    player = playerjs.Player(iframe);
    player.on('ready', function(){
      player.play();
    });

    player.on('ended', function(){
      index++;
      if (index >= video_playlist.length) {
        index = 0;
      }
        play_video(index);
    });
  }

  function onSuccess(videos) {
      for(var index= 0; index < videos.items.length; index++){
        var video = videos.items[index];
        if (video.type === "video"){
          var video_info = {
            id : video.id,
            title : video.title,
            description : video.description_plain,
          };
          video_playlist.push(video_info);
        }
      };
           
      play_video(0);
      for(var index = 0; index < video_playlist.length; index++) {
        console.log(video_playlist[index]);
      }
  }

  //AJAX calling API for riipen.mediacore.tv
  function start_videos() {
    $.ajax({
    method:'GET',
    url: 'https://riipen.mediacore.tv/api2/media',
    dataType: 'json',
    username: "riipenchallenge@mediacore.com", 
    password: "riipenchallenge",
    crossDomain: true,
    success: onSuccess,
    failure: function (issue) {
          alert(issue + " error occured");
    },
  });
  }

  return {
    start : start_videos
  };
}();

$(document).ready(function() {
  video_player.start();
});