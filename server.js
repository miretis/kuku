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
        case "/index":
            return res.end(indexHtmlFile);
        case "/style.css":
            return res.end(fileCSS);
        case "/script.js":
            return res.end(scriptJS);
        case "/add":
            addMessage(res, req);
        case "/bobr":
            return res.end(`<html><body><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/American_Beaver.jpg/640px-American_Beaver.jpg"></body></html>`);
            break;
        default:
            res.statusCode = 404;
            return res.end('Error 404');
    }
});

function addMessage(res,req){
    let data = ""
    req.on('data', function(chunk){
        data += chunk;
    })
    req.on('end', function(){
        console.log(data);
    })
    res.writeHead(302, {Location: '/'});
    res.end();
}

server.listen(3000);