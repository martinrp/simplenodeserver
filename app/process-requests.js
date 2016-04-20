'use strict';

let HtmlGen = require('./generate-html');
let qs      = require('querystring');

function processPost(req, res, callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    // Check for postVar - else throw error
    let postData = null;
    let body = '';

    req.on('data', function (data) {
        // Check if data packet is too large
        if(data.length > 1e6) {
            let err = new Error('413 : Request entity too large');
            err.name = 'EntityTooLargeError';
            callback(err, req, res, null);
            return;
        }
        body += data;
    });
    req.on('end',function(){
        postData = qs.parse(body);
        console.log('postData', postData);

        if (postData.postVar){ 
            let addHtml = `Your POST variable value: ${postData.postVar}`;
            let html = HtmlGen.returnBaseHtml(req, addHtml);
            callback(null, req, res, html);
        } else { 
            let err = new Error('422 : Unprocessable entity');
            err.name = 'UnprocessableEntityError';
            callback(err, req, res, null);
        }
    });
}

function processGet(req, res, callback) {
    callback = (typeof callback === 'function') ? callback : function() {};

    let html = HtmlGen.returnBaseHtml(req);
    callback(null, req, res, html);
}


module.exports = {
    processPost: processPost,
    processGet: processGet
}