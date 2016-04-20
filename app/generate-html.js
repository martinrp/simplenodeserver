'use strict';

let UserLang = require('./user-language');

// Ideally use template engine or injext into a html file rather than just ``
function getBaseHtml(req, addHtml) {
    let language = UserLang.getPrimaryLang(req.headers['accept-language']);
    addHtml = (typeof addHtml === 'string') ? addHtml : '';

    let html = `
    <div>
        <h3>Your language is: ${language}</h3>
        <h3>You sent a: ${req.method}</h3>
    </div>
    ${addHtml}
    `;

    return _getFinalHtml(html);
}

function getNoPostVarHtml(content){
    return _getFinalHtml(content);
}

function _getFinalHtml(content){
     var html = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Node simple server</title>
        </head>
        <body>
            ${content}
        </body>
    </html>
    `;
    return html;
}

module.exports = {
    getBaseHtml: getBaseHtml,
    getNoPostVarHtml: getNoPostVarHtml
}