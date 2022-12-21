var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

let mimeTypes = {
  '.html' : 'text/html',
  '.json' : 'application/json',
  '.js' : 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
}

function getFileType(filePath){
  let extension = path.extname(filePath);
  console.log(extension);
  return mimeTypes[extension];
}

function getFilePath(pathName){
  console.log(pathName);
  if(pathName == "/") return "index.html";
  return "." + pathName;
}


http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  if(q.pathname == "/favicon.ico") return;
  let filePath = getFilePath(q.pathname);
  
  fs.readFile(filePath, function(err, data) {
          res.writeHead(200, {'Content-Type': getFileType(filePath)});
      res.write(data);
      return res.end();
    });

}).listen(8080);