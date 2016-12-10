//takes images, goes from 0-whatever is the last.
var tessel = require('tessel');
var ambientlib = require('ambient-attx4'); // Replace '../' with 'ambient-attx4' in your own code
var ambient = ambientlib.use(tessel.port['A']);
var fs = require('fs');
var os = require('os');
var path = require('path');
var av = require ('tessel-av');
var camera = new av.Camera();
var stream = camera.stream();
// var fs = require('fs');
// var url = require('url');
// var http = require('https');
// var util = require('util');
var i = 0;

// Either
// a)stream the file to the Microsoft Cognitive API every time I clap
// b)run a separate program against the stored files
// c)upload images to directory and pass off data to Microsoft

//make sure this saves images sequentially using i variable

var takePicture = function(){
  console.log("takePicture function");
  // var fileName = Math.round(new Date().getTime()/1000);
    var filePath = path.join('/mnt/sda1/img',i +'.jpg');
    var fileStream = fs.createWriteStream(filePath);
    for (var d =0; d<1; d++){
      console.log(filePath);
      stream.on('frame', function(data) {
      // console.log('stream.on');
      fileStream.write(data);
      // initiateAPI(filePath);
      });
      i++;
    }
};


ambient.on('ready', function () {
  // Set a sound level trigger
  // The trigger is a float between 0 and 1
  ambient.setSoundTrigger(0.2);
  console.log('Waiting for a bright light or a sound...');
  ambient.on('sound-trigger', function(data) {
  takePicture();  
        // console.log("Something happened with sound: ", data);
    });
    // Clear it
    ambient.clearSoundTrigger();
    //After 1 seconds reset sound trigger
    setTimeout(function () {
        ambient.setSoundTrigger(0.2);
    },1000);
});

ambient.on('error', function (err) {
  console.log(err);
});