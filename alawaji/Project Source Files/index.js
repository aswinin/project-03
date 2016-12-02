var tessel = require("tessel");
var backpack = require('backpack-ht16k33').use(tessel.port['B']);
var mqtt = require('mqtt')

var deviceName = "hangee";
var clearBitmap = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];

backpack.on('ready', function() {
  backpack.clear();

  var client  = mqtt.connect('mqtt://162.243.219.88',1883)

  client.on('connect', function () {
    console.log("Connected");
        client.subscribe('backpackBitmap');
        client.publish('backpackBitmap', JSON.stringify({name:deviceName,data:clearBitmap}));
  });


  client.on('message', function (topic, message) {
    var incoming = JSON.parse(message.toString());
    if(incoming.name == deviceName)
    {
      backpack.clear();
      backpack.writeBitmap(incoming.data);
      console.log(message.toString())
    }
  })
  
});

// Example string
// "[[1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1]]"

