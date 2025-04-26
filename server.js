const http = require('http');
const fs = require('fs');
const path = require('path');

const  pathToIndex =  path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);

const pathToCss  =  path.join(__dirname, 'static', 'style.css');
const fileCSS = fs.readFileSync(pathToCss);

const pathToJS  =  path.join(__dirname, 'static', 'script.js');
const scriptJS = fs.readFileSync(pathToJS);

const server = http.createServer((req, res)=>{


    switch(req.url){
        case "/":
            return res.end(indexHtmlFile);
        case "/style.css":
            return res.end(fileCSS);
        case "/script.js":
            return res.end(scriptJS);
        default:
            res.statusCode = 404;
            return res.end('Error 404');
    }
        

});

server.listen(3000);