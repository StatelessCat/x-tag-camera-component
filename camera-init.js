window.onload = function () {
  var WIDTH = 100;

  var hasGetUserMedia = function () {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  };

  if (hasGetUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      var video = $("video")[0];
      var vgaConstraints = {video: {}};

      navigator.getUserMedia(vgaConstraints, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.setAttribute('width', WIDTH);

        $("video").click(function () {
          var canvas = $("canvas")[0];
          var ctx = canvas.getContext('2d');
          canvas.width = WIDTH;
          canvas.height = WIDTH/4*3;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          $("img").attr("src", canvas.toDataURL('image/png'));
        });
      }, function (err) {
        console.log(err);
      });
    }
  } else {
    console.log('getUserMedia() is not supported in your browser');
  }
};
