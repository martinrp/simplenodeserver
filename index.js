'use strict';

let http    = require('http');
let url     = require('url');
let fs      = require('fs');
let path    = require('path');

let HtmlGen = require('./app/generate-html');
let ProcReq = require('./app/process-requests');

const PORT = 8000;

function init (req, res){
    // Try / Catch error handling
    try {
        let reqUrl = url.parse(req.url);
        let filePath = path.normalize(reqUrl.pathname);
        // Only accept requests on index
        if (filePath === '/'){
            _handleReq(req, res);
        } else {
            let err = new Error('404 : File not found');
            err.name = 'FileNotFoundError';
            throw err;
        }

    } catch (e) {
        _handleErrors(e, res);
    }
}

http.createServer(init).listen(PORT, function(){
    console.log('Server listening on port %s', PORT);
});

// Server private functions

function _handleReq(req, res) {
    // Ensure method is Either POST or GET, if not throw err
    if (req.method === 'POST') {
        ProcReq.processPost(req, res, _resComplete);
    } else if (req.method === 'GET') {
        ProcReq.processGet(req, res, _resComplete);
    } else {
        let err = new Error('405 : Method not allowed');
        err.name = 'MethodNotAllowedError';
        throw err;
    }
}

function _resComplete(e, req, res, html){
    if (e){ 
        _handleErrors(e, res);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(html);
    }
}

// TODO: Create custom HTML errors, rather than inserting name/msg each time
function _handleErrors(e, res){
    console.log('Error', e.name, e.message);
    if (e.name === 'MethodNotAllowedError') {
        // Method not allowed
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.write(e + '\n');
        res.end();
    } else if (e.name === 'FileNotFoundError') {
        // File not found
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write(e + '\n');
        res.end();
    } else if (e.name === 'UnprocessableEntityError') {
        // Unprocessable entity
        let html = HtmlGen.getNoPostVarHtml(e.message);
        res.writeHead(422, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    } else if (e.name === 'EntityTooLargeError') {
        // Request entity too large
        res.writeHead(413, {'Content-Type': 'text/plain'});
        res.write(e + '\n');
        res.end();
        req.connection.destroy();
    }
    else {
        // All other errors
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write(e + '\n');
        res.end();
    }
}
