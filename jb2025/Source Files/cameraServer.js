var fs = require('fs');
var os = require('os');
var http = require('http');
var port = 8081;


console.log(require('os').networkInterfaces().wlan0[0].address);
var server = http.createServer((request, response) => {
	var filePath = '.' + request.url;
	fs.readFile(filePath, function (error, content){
		if (error){
			response.writeHead(500);
			response.end('Sorry, error: '+error.code+'..\n');
		}
		else{
			response.writeHead(200, { 'Content-Type': 'image.jpg'});
			response.end(content, 'binary');
		}
	});

  // response.writeHead(200, { "Content-Type": "image/jpg" });
  // camera.capture().pipe(response);
 
}).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));
 

process.on("SIGINT", _ => server.close());





// var av = require('tessel-av');
// var camera = new av.Camera({
//   width: 320,
//   height: 240,
// });

