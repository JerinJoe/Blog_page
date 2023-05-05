const http = require('http');
const fs = require('fs');
const _ = require('lodash');
//put it inthis format if creating web socket

const server = http.createServer((req,res) => {
    // console.log(req.url,req.method);

    //lodash

    const num = _.random(1,20);
    console.log(num);

    const greet = _.once(()=>{
        console.log('hello');
    });
    // set header-content type

    greet();
    greet();
    res.setHeader('Content-Type','text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    //send html file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
           // res.write(data);
           
            res.end(data);
        }
    });
    
});

server.listen(3000,'localhost',()=>{
    console.log('listening for request on port 3000')
});
//local host is like domain name on web
//loopback ip address