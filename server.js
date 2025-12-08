const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 3000;

const server = http.createServer((request, response) => {
    const requestUrl = url.parse(request.url).pathname;
    console.log(requestUrl);

    // --- ROOT '/' --- serveeri index.html
    if (requestUrl === '/') {
        fs.readFile('index.html', (error, fileContent) => {
            if (error) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.write('Error. File not found.');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(fileContent);
            }
            response.end();
        });
        return; // ÄRA lase ülejäänud koodi käima!
    }

    // --- TEISED LEHED ---
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    if (requestUrl === '/about') {
        response.write('Hello from /about');
    } else if (requestUrl === '/contact') {
        response.write('Hello from /contact');
    } else {
        response.write(`${requestUrl} path not found.`);
    }

    response.end();
});

server.listen(port, error => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is listening on port ${port}.`);
    }
});
