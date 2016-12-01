var Twit = require('twit');


var T = new Twit({

  consumer_key: 'CbcYhV2o2uzboJbzdEFdGnGW3',
  consumer_secret: 'PdNhNIK86m8dD8Q5mLPVPFDfodzXnj0yASsyg5oevmLL1j6dJu',
  access_token: '566483662-SnAgqKt0eslMceX2YVRLHdlzBLB7RLdjNBObxDxS',
  access_token_secret: '4tNBVYf1jCet9v6pKmDQmIczRGazPtf3HHrPD3ZQWA0LQ',
 // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})
 
var fs = require('fs');
var util=require('util');
var logFile=fs.createWriteStream('log.json',{flags:'a'});
var logStdout=process.stdout;



var arr=[];
var stream=T.stream('statuses/filter', { track: '@apple', language: 'en' })
 
stream.on('tweet', function (tweet) {
console.log(tweet.text);
})


 console.log=function(){
 
 	logFile.write(util.format.apply(null, arguments)+"\n");
 	logStdout.write(util.format.apply(null, arguments)+"\n");
 }

console.error=console.log;

 //wstream.end();
//T.get('search/data.json', { q: '#Apple since:2011-07-11', count: 50}, function(req, response) {

//response.json(data);

//});
 

