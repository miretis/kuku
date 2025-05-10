const http = require('http');
const fs = require('fs');
const path = require('path');

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);

const pathToJS= path.join(__dirname, 'static', 'script.js');
const JSFile = fs.readFileSync(pathToJS);


const pathToCSS= path.join(__dirname, 'static', 'style.css');
const CSSFile = fs.readFileSync(pathToCSS);

const server = http.createServer((req, res)=>{
    //Liza ostrologiya eto ne nayka
    switch(req.url){
        case "/":
            return res.end(indexHtmlFile); 
        case "/script.js":
            return res.end(JSFile); 
        case "/style.css":
            return res.end(CSSFile);
        case "/add":
            addMessage(res, req);
            break;
        default:
            res.statusCode = 404;
            return res.end('Error 404');
    }
});
server.listen(3000);
function addMessage(res, req){
    let data = ""
    req.on('data', function(chunk){
        data += chunk;
    })
    req.on('end',function(){
        console.log(data);
    })    
    res.writeHead(302, {Location: '/'});
    res.end();
}



const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("user conn. id =" + socket.id);

    socket.on('new_message', (message) => {
        console.log(message); 
        io.emit('message', message);
    });
});