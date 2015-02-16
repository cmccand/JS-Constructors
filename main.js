//
// var canvas = document.createElement("canvas");
// var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
// document.body.appendChild(canvas);
//
// function Sprite(url, pos, size, speed, frames, dir, once) {
//   this.pos = pos;
//   this.size = size;
//   this.speed = typeof speed === 'number' ? speed : 0;
//   this.frames = frames;
//   this._index = 0;
//   this.url = url;
//   this.dir = dir || 'horizontal';
//   this.once = once;
//
//   ctx.drawImage('http://fc08.deviantart.net/fs70/i/2010/011/7/5/REAL_Michael_Jackson_Sprites_by_Tango458.png', 0, 0);
// };
//
// Sprite();

$(".dancer").animateSprite({
  fps: 4,
  animations: {
    walkRight: [0, 1, 2, 3, 4, 5],
  },
  loop: true,
  complete: function(){
    // use complete only when you set animations with 'loop: false'
    alert("animation End");
  }
});

(function() {

//vendor requestAnimationFrames
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
    || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }());

//end vendors

//Start dancer functions

    (function () {

      var coin,
      coinImage,
      canvas;

      function gameLoop () {

        window.requestAnimationFrame(gameLoop);

        coin.update();
        coin.render();
      }

      function Sprite (spec) {

        var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = spec.ticksPerFrame || 0,
        numberOfFrames = spec.numberOfFrames || 1;

        that.context = spec.context;
        that.width = spec.width;
        that.height = spec.height;
        that.image = spec.image;

        that.update = function () {

          tickCount += 1;

          if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
              // Go to the next frame
              frameIndex += 1;
            } else {
              frameIndex = 0;
            }
          }
        };

        that.render = function () {

          // Clear the canvas
          that.context.clearRect(0, 0, that.width, that.height);

          // Draw the animation
          that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            19,
            that.width / numberOfFrames,
            that.height,
            0,
            0,
            that.width / numberOfFrames,
            that.height);
          };

          return that;
        }

        // Get canvas
        canvas = document.getElementById("coinAnimation");
        canvas.width = 55;
        canvas.height = 50;

        // Create sprite sheet
        coinImage = new Image();

        // Create sprite
        coin = new Sprite({
          context: canvas.getContext("2d"),
          width: 1215,
          height: 50,
          image: coinImage,
          numberOfFrames: 19,
          ticksPerFrame: 6,
        });

        // Load sprite sheet
        coinImage.addEventListener("load", gameLoop);
        coinImage.src = "dancer.png";

      } ());
