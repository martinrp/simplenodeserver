'use strict';

let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');

const BASE_DIRECTORY = '/files';
const PORT = 8000;

http.createServer(function(req, res){
    try {

    } catch(e) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write(e + "\n");
        res.end();
    }
}).listen(PORT);