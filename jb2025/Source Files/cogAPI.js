//Microsoft Cognitive API Call
// API URL : https://api.projectoxford.ai/emotion/v1.0/recognize?
var fs = require('fs');
var url = require('url');
var http = require('https');
var util = require('util');
var placeHolder = [];
var returnData = [];
var lastStatus = '200';
                                // ~~~~~~~~~~~~ //
                                // Important!!! // 
                                // ~~~~~~~~~~~~ //
                    //Double check where this points
var pullData = '18.111.105.247:8081/mnt/sda1/img/';// assign tessel *IP*:8081/mnt/sda1/img/ 
var jsonFile = require('jsonfile');
var file = './data.json';
var i = 0;

var parsedURL = url.parse("https://api.projectoxford.ai/emotion/v1.0/recognize");
var options = {
    host: parsedURL.host,
    path: '/emotion/v1.0/recognize',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        //          ADD YOUR API KEY HERE
        'Ocp-Apim-Subscription-Key': "yourkeyhere",
    },
};

var post_req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    lastStatus = res.statusCode;
    res.on('data', function (responseBody) {
        console.log('BODY:' + responseBody.toString('utf-8'));
        jsonFile.writeFileSync(file, JSON.parse(responseBody.toString('utf-8')), {flag: 'a'}, function(err){
        console.error(err);
        });

        // console.log('BODY: ' + util.inspect(responseBody, {showHidden: false, depth: null}));
        // console.log(responseBody);
        // console.log(JSON.stringify(responseBody));
        // Do your processing post async response
        post_req.end();
        callItBack();
    });


});

function callItBack(){
	if (lastStatus == 200){
		console.log("{'url':'"+pullData+i+".jpg'}");    	
        post_req.write("{'url':'"+pullData+i+".jpg'}");
        i++;
	}
	else {
		console.log("done");
	}
}

(function (){
        	console.log("{'url':'"+pullData+i+".jpg'}");    	
            post_req.write("{'url':'"+pullData+i+".jpg'}");
})();
 

