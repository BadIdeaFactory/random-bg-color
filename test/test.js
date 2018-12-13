const expect = require('chai').expect;
const jsdom = require("jsdom");
const setRandomBgColor = require('../src/index.js');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
console.log(JSDOM, document)
describe('Array', function () {
  it('does things', function () {
    expect(setRandomBgColor(document.body)).to.be(null);
  });
});
