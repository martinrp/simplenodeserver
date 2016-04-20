'use strict';

let assert      = require('chai').assert;
let expect      = require("chai").expect;
let app         = require('../index');
let userLang    = require('../app/user-language.js');

describe('App', function() {
    describe('Split languages', function () {
        it('should return an array of 2 language sets', function () {
            let testString = 'en-gb,en;q=0.8, ru;q=0.7';
            let testArray = userLang.splitLangs(testString);

            expect(testArray).to.be.an('array');
            expect(testArray).to.have.length(3);
        });
    });

    describe('Get Primary Lang', function () {
        it('should return the string en-gb', function () {
            let testString = 'en-gb,en;q=0.8, ru;q=0.7';
            let primaryLang = userLang.getPrimaryLang(testString);

            expect(primaryLang).to.be.a('string');
            expect(primaryLang).to.equal('en-gb');
        });
    });
});