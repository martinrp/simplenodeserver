'use strict';

let UserLang = require('./user-language');

// Ideally use template engine or injext into a html file rather than just ``
function returnBaseHtml(req, addHtml) {
    let language = UserLang.getPrimaryLang(req.headers['accept-language']);
    addHtml = (typeof addHtml === 'string') ? addHtml : '';

    let html = `
    Your language is: ${language}

    You sent a: ${req.method}

    ${addHtml}
    `;

    return html;
}

module.exports = {
    returnBaseHtml: returnBaseHtml
}