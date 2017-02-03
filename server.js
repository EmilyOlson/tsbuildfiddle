var fs = require('fs');
var http = require('http');
var path = require('path');

http.createServer(function (request, response) {
    if (request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(fs.readFileSync('index.html'));
        response.end();
    } else if (request.url === '/dist/bundle.js') {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(fs.readFileSync('dist/bundle.js'));
        response.end();
    } else if (request.url === '/dist/bundle.css') {
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(fs.readFileSync('dist/bundle.css'));
        response.end();
    } else if (request.url === '/dist/bundle.js.map') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(fs.readFileSync('dist/bundle.js.map'));
        response.end();
    } else if (request.url === '/dist/bundle.css.map') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(fs.readFileSync('dist/bundle.css.map'));
        response.end();
    } else {
        var filePath = './static' + request.url;
        var extension = path.extname(filePath);
        var contentType = 'text/html';

        switch (extension) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }
}).listen(8888);

console.log('Navigate to localhost:8888');